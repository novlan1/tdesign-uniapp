set -ex

# 文件路径
FILE=packages/tdesign-app/unpackage/release/ipa/__UNI__4771450__20251022024254.ipa
# 目标
TARGET_PATH=/data/landun/workspace/p-30ff30b405b24a228b4fa22cb05b7db3/src

scp -P 36000 -r $FILE root@my:$TARGET_PATH
