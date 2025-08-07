# 贡献指南

目录

```bash
- package
  - tdesign    # npm 包 
  - site       # 文档/示例
```

示例开发

```bash
# H5
pnpm --filter="./packages/site" dev:h5

# 微信小程序
pnpm --filter="./packages/site" dev:mp-weixin
```

整体思路

1. 先用现成脚本跑一遍得到粗略的产物
2. 上面产物必然有很多编译和运行时问题，先手动改代码，让基础组件可运行
3. 所有坑踩的差不多后，写脚本，能够实现第二步的改动
4. 查漏补缺，补完demo、补充单元测试、完善文档

TODO:

1. relation, behavior 等其他适配
2. 脚本批量处理
3. site 使用 tdesign 同一套
4. 寻找 demo 复用方案，避免写两套
5. 单元测试
