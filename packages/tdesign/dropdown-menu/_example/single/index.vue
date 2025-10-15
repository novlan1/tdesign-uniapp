<template>
  <view>
    <t-dropdown-menu>
      <t-dropdown-item
        :options="product.options"
        placement="right"
        :value="product.value"
        @change="onChange"
      />
      <t-dropdown-item
        :options="sorter.options"
        placement="right"
        :default-value="sorter.value"
      />
    </t-dropdown-menu>
  </view>
</template>

<script>
import tDropdownMenu from 'tdesign-uniapp/dropdown-menu/dropdown-menu.vue';
import tDropdownItem from 'tdesign-uniapp/dropdown-item/dropdown-item.vue';
export default {
  components: {
    tDropdownMenu,
    tDropdownItem,
  },
  data() {
    return {
      product: {
        value: 'all',
        options: [
          {
            value: 'all',
            label: '全部产品',
          },
          {
            value: 'new',
            label: '最新产品',
          },
          {
            value: 'hot',
            label: '最火产品',
          },
          {
            value: 'disabled',
            label: '禁用选项',
            disabled: true,
          },
        ],
      },
      sorter: {
        value: 'default',
        options: [
          {
            value: 'default',
            label: '默认排序',
          },
          {
            value: 'price',
            label: '价格从高到低',
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    onChange(e) {
      this.product.value = e.value;
    },
  },
};
</script>
<style>
</style>
