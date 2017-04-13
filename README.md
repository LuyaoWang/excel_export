# excel_export
This small tool is used to analyze txt and export a excel document (.xlsx) by node
********************************************************************
* excel处理脚本
* 开发时间 2017/04
* 联系人：sei_wly2010@126.com
*********************************************************************
一、安装
windows平台：
1、下载nvm，双击nvm-setup安装
2、用管理员身份打开cmd（命令提示符）。
3、在cmd中输入以下命令等待安装完成:
nvm install latest
4、输入以下命令查看版本：
node -v
会得到一个vx.xx.xx的版本号，例如：v7.8.0
5、输入：
nvm use 版本号，例如nvm use 7.8.0
npm install
6、关闭cmd。

mac平台
1.打开terminal终端,先输入node -v看看有没有安装node，如果有，就跳过前4步。
2.输入：cd 想安装nvm的地址。从而转移到这个地址。例如 cd excel/
3.安装nvm，输入：
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
4.安装node，输入:
nvm install 7
nvm use 7
5.输入：cd 应用文件夹的目录，然后输入：npm install

二、使用
windows
1、打开配置文件config.txt文件按照指令填写好相关数据
2、用管理员身份打开cmd（命令提示符）。
3、输入:cd 代码所在文件夹
4、输入:node app.js

mac
1、打开配置文件config.txt文件按照指令填写好相关数据
2、打开终端terminal。
3、输入:cd 代码所在文件夹
4、输入:node app.js