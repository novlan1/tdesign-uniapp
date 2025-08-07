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
      
      // this.setData = function(obj) {
      //   Object.keys(obj).forEach(key => {
      //     this.$set(this, key, obj[key])
      //     this[key] = obj[key]
      //   })
      // }
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
        if (info.lifetimes?.ready) {
        console.log('doing attached')
        info.lifetimes.ready.call(this)
      }
    },
    data() {
      const willSetData = this.$options[WILL_SET_DATA_KEY]
      return {
        ...(willSetData || {}),
      }
    },
    mounted() {
      console.log('doing mounted', this, info)
      if (info.lifetimes?.attached) {
        console.log('doing attached')
        info.lifetimes.attached.call(this)
      }
    },
    watch: getComponentWatch(info),
    ...parseProps(info),
  }
}


function parseProps(info, vm) {
  if (!info.properties) {
    return info;
  }
  const { properties } = info;
  const result = {}
  console.log('info.properties', info.properties)
  Object.keys(properties).forEach(key => {
    result[key] = {
      type: properties[key].type
    }
    if (properties[key].value) {
      result[key].default = properties[key].value
    }
  })
  
  console.log('this', vm)

  return {
    ...info,
    props: result,
    methods: {
      ...(info.methods || {}),
      ...(info[COMMON_UTILS_WXS_NAME] || {}),
      setData (obj) {
        console.log('[doing setData]', obj)
        Object.keys(obj).forEach(key => {
          // this.$set(this, key, obj[key])
          this[key] = obj[key]
        })
        console.log('className', this.className, this)
      }
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



function getComponentWatch(info) {
  if (!info.observers) {
    return {};
  }
  const { observers } = info;
  Object.keys(observers).reduce((acc, item) => {
    const key = item.split(',').map(item => item.trim())
    return {
      ...acc,
      [key]: observers[item]
    }
  }, {})
}
