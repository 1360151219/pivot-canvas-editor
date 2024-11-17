import React from 'react';
import { Tabs, TabPane, Form, Button } from '@douyinfe/semi-ui';
import { IconUpload } from '@douyinfe/semi-icons';
import { FabricImage } from 'fabric';
import { useGlobal } from '@src/context';
const SideBar = () => {
  const {
    state: { canvas },
  } = useGlobal();
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[300px] border border-gray-200 rounded-lg bg-white px-6 py-3">
      <Form labelPosition="left">
        <Tabs type="line">
          <TabPane tab="文档" itemKey="1">
            <Form.Upload
              action=""
              customRequest={(obj) => {
                const { onSuccess, file } = obj;
                if (file.url) {
                  console.log('====', file.url);
                  FabricImage.fromURL(file.url).then((res) => {
                    console.log(res);
                    canvas.add(res);
                    onSuccess(obj);
                  });
                }
              }}
              accept=".png,.jpg"
              field="add_image"
              label="插入图片"
            >
              <Button icon={<IconUpload />} theme="light">
                点击上传
              </Button>
            </Form.Upload>
            <Button
              className="w-full"
              size="large"
              onClick={async () => {
                const dataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.8, multiplier: canvas.getZoom() });
                const blob = await fetch(dataURL).then((res) => res.blob());
                const dom = document.createElement('a');
                dom.href = URL.createObjectURL(blob);
                dom.download = 'export';
                dom.click();
              }}
            >
              导出
            </Button>
          </TabPane>
          <TabPane tab="快速起步" itemKey="2">
            <h3>快速起步</h3>
            <pre
              style={{
                margin: '24px 0',
                padding: '20px',
                border: 'none',
                whiteSpace: 'normal',
                borderRadius: 'var(--semi-border-radius-medium)',
                color: 'var(--semi-color-text-1)',
                backgroundColor: 'var(--semi-color-fill-0)',
              }}
            >
              <code>yarn add @douyinfe/semi-ui</code>
            </pre>
          </TabPane>
          <TabPane tab="帮助" itemKey="3">
            <h3>帮助</h3>
            <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-0)', fontWeight: 600 }}>
              Q：有新组件需求、或者现有组件feature不能满足业务需求？
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-1)' }}>
              右上角问题反馈，提交issue，label选择Feature Request / New Component Request 我们会高优处理这些需求。
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-0)', fontWeight: 600 }}>
              Q：对组件的使用有疑惑？
            </p>
            <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-1)' }}>欢迎进我们的客服lark群进行咨询提问。</p>
          </TabPane>
        </Tabs>
      </Form>
    </div>
  );
};

export default SideBar;
