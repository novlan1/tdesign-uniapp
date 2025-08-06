# 贡献指南

目录

```bash
- package
  - tdesign    # npm 包 
  - demo       # 示例
```

示例开发

```bash
# H5
pnpm --filter="./packages/demo" dev:h5

# 微信小程序
pnpm --filter="./packages/demo" dev:mp-weixin
```

TODO:

1. relation, behavior 等其他适配
2. 脚本批量处理
3. site 使用 tdesign 同一套
4. 寻找 demo 复用方案，避免写两套
