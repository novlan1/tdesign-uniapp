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

TODO:

1. relation, behavior 等其他适配
2. 脚本批量处理
3. site 使用 tdesign 同一套
4. 寻找 demo 复用方案，避免写两套
5. 单元测试
