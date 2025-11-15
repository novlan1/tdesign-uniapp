/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

const props = {
    /** markdown 内容文本 */
    content: {
        type: String,
        default: '',
    },
    /** Markdown 解析器基础配置 */
    options: {
        type: Object,
        default: () => ({
            gfm: true,
            pedantic: false,
            breaks: true
        })
    }
};
export default props;
