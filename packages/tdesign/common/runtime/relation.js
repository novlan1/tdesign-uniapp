import { toCamel } from '../utils'

const RELATION_MAP = {
  CollapsePanel: 'Collapse',
  TabPanel: 'Tabs',

  StepItem: 'Steps',
  TabBarItem: 'TabBar',
  SideBarItem: 'SideBar',
  GridItem: 'Grid',
  DropdownItem: 'DropdownMenu',

  Radio: 'RadioGroup',
  Checkbox: 'CheckboxGroup',
  Cell: 'CellGroup',
  Avatar: 'AvatarGroup',
  PickerItem: 'Picker',
  
  IndexesAnchor: 'Indexes',
  SwiperNav: 'Swiper',

  Col: 'Row',
  BackTop: 'PullDownRefresh',
}


export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function parseRelation(info, options) {
  if (!info.relations) {
    return {}
  }
  const { relations } = info;
  const key = Object.keys(relations)[0]
  if (!key) {
    return {}
  }
  const isChild = [
    'descendant',
    'child'
  ].includes(relations[key].type)

  const parentName = key.split('/')[key.split('/').length - 1];
  const parsedParentName = capitalize(toCamel(parentName))

  
  let mixins = []
  if (isChild) {
    mixins.push(getParentMixin(RELATION_MAP[parsedParentName]));
  } else {
    mixins.push(getChildMixin(parsedParentName, {
      ...(options || {}),
      relationCallbacks: info.relationCallbacks,
    },))
  }


  if (info.mixins) {
    info.mixins.push(...mixins)
  } else {
    info.mixins = mixins;
  }
  return info;
}


function getChildMixin(parent, options = {}) {
  const { indexKey = 'index', relationCallbacks } = options.indexKey || 'index';

  
  return {
    inject: {
      // #ifndef MP-TOUTIAO
      [parent]: {
        default: null,
      },
      // #endif
    },
    data() {
      return {
        // #ifdef MP-TOUTIAO
        [parent]: null,
        // #endif
        relationParentName: parent,
      };
    },
    computed: {
      [indexKey]() {
        const that = this;

        that.bindRelation();

        if (that[parent]) {
          return that[parent].children.indexOf(this);
        }

        return null;
      },
    },

    watch: {
      disableBindRelation(val) {
        const that = this;
        if (!val) {
          that.bindRelation();
        }
      },
    },

    created() {
      this.relationParentName = parent;
      // #ifndef H5
      const that = this;
      that.bindRelation();
      // #endif
    },


    mounted() {
      // #ifdef H5
      const that = this;
      that.bindRelation();
      // #endif
      this.relationParentName = parent;

      
      if (typeof relationCallbacks?.mounted === 'function') {
        relationCallbacks?.mounted.call(this)
      }
    },

    // #ifdef VUE2
    beforeDestroy() {
      const that = this;
      that.onBeforeMount();
    },
    // #endif

    // #ifdef VUE3
    beforeUnmount() {
      const that = this;
      that.onBeforeMount();
    },
    // #endif

    methods: {
      bindRelation() {
        // #ifdef MP-TOUTIAO
        const parentComponentName = `Press${parent.replace(/^\w/, a => a.toUpperCase())}`;
        this[parent] = getParent.call(this, parentComponentName);
        // #endif
        
        
        if (!this[parent] || (this[parent].children && this[parent].children.indexOf(this) !== -1)) {
          return;
        }
        
        const children = [...(this[parent].children || []), this];

        
        this[parent].children = children;
        
      },
      onBeforeMount() {
        const that = this;
        if (that[parent]) {
          that[parent].children = that[parent].children.filter(item => item !== that);

          that?.destroyCallback?.();
        }
      },
    },
  };
}


function getParentMixin(parentName) {
  
  return {
    provide() {
      return {
        [parentName]: this,
      }
    }
  }
}
