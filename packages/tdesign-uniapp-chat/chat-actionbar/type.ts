/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdChatActionbarProps {
    /**
     * 操作栏配置
     * @default ['replay', 'copy', 'good', 'bad', 'share']
     */
    actionBar?: Array<'replay' | 'copy' | 'good' | 'bad' | 'share'>;
    /**
     * 【实验】聊天消息的唯一标识
     * @default ''
     */
    chatId?: string;
    /**
     * 评价内容
     * @default ''
     */
    comment?: string;
    /**
     * 被复制的内容
     * @default ''
     */
    content?: string;
    /**
     * 【实验】复制内容的模式，可选 'markdown'（复制markdown原文）或 'text'（复制纯文本）
     * @default markdown
     */
    copyMode?: 'markdown' | 'text';
    /**
     * 【讨论中】操作按钮是否可点击
     * @default false
     */
    disabled?: boolean;
    /**
     * 【实验】操作栏位置
     * @default start
     */
    placement?: 'start' | 'end' | 'space-around' | 'space-between';
}
