export const WILL_SET_DATA_KEY = 'WILL_SET_DATA_KEY';
export const COMMON_UTILS_WXS_NAME = '_';

export function initTDesign(info) {
  const originCreated = info.created
  return {
    created() {
      const willSetData = this.$options[WILL_SET_DATA_KEY]
      const commonWxs = info[COMMON_UTILS_WXS_NAME];
      console.log('[created.willSetData]', willSetData)
      if (originCreated) {
        originCreated.call(this)
      }
      
      this.setData = function(obj) {
        Object.keys(obj).forEach(key => {
          this.$set(this, key, willSetData[key])
        })
      }
      if (willSetData) {
         Object.keys(willSetData).forEach(key => {
          this[key] = willSetData[key]
        })
      }
      console.log('commonWxs', commonWxs)
      if (commonWxs) {
         Object.keys(commonWxs).forEach(key => {
          this[COMMON_UTILS_WXS_NAME][key] = commonWxs[key]
        })
      }
    },
    mounted() {

    },
    ...parseProps(info),
  }
}


function parseProps(info, vm) {
  if (!info.props) {
    return info;
  }
  const { props } = info;
  const result = {}
  console.log('info.props', info.props)
  Object.keys(props).forEach(key => {
    result[key] = {
      type: props[key].type
    }
    if (props[key].value) {
      result[key].default = props[key].value
    }
  })
  
  console.log('this', vm)

  return {
    ...info,
    props: result,
    methods: {
      ...(info.methods || {}),
      ...(info[COMMON_UTILS_WXS_NAME] || {}),
    }
  }
}

export function setData(obj) {
  console.log('this', this)
  this[WILL_SET_DATA_KEY] = obj;
  // Object.keys(obj).forEach(key => {
  //   this[key] = obj[key]
  // })
}
