# 🎆 Celestial Firework Lucky Draw & VIP Golden Ticket Gala System
### 星穹烟花与金票盛典年会抽奖系统 · 企业大会级离线/在线双用抽奖平台

[![Live Demo](https://img.shields.io/badge/Demo-Click%20to%20Play%20Online-ff4655?style=for-the-badge&logo=googlechrome&logoColor=white)](https://chenjunwei1230-dotcom.github.io/annual-gala-lucky-draw/)
[![GitHub stars](https://img.shields.io/github/stars/chenjunwei1230-dotcom/annual-gala-lucky-draw?style=for-the-badge)](https://github.com/chenjunwei1230-dotcom/annual-gala-lucky-draw)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌐 在线体验与使用 (Live Online Demo)

无需下载安装任何软件，在手机或电脑浏览器中直接点开即可体验完整抽奖与烟花音效：  
👉 **[https://chenjunwei1230-dotcom.github.io/annual-gala-lucky-draw/](https://chenjunwei1230-dotcom.github.io/annual-gala-lucky-draw/)**

*(支持全屏投屏、快捷键空格抽奖、一键导入 Excel、自定义奖项与票券文案)*

---

## 🌟 效果实拍展示 (Visual Effects & Showcase)

> 💡 **使用前视觉预览**：以下均为系统真实运行 4K/60FPS 画质实拍，让您在部署活动前直观感受每一处舞台特效。

### 1. 🌌 盛典主舞台静置状态 (Live Gala Arena Stage)
浩瀚星空动态银河光带、悬浮星盘罗盘仪、倒计时状态栏与顶部实时奖项轮播：
![Stage Arena Idle](docs/screenshots/01_stage_arena_idle.png)

---

### 2. 🎆 60 FPS 物理烟花升空与多级连爆 (Pyrotechnic Fireworks Explosion)
迫击炮轰鸣发射、火箭尖啸拖尾腾空、千丝垂柳金屑（Kamuro Willows）重力衰减与全屏彩带雨粒子：
![Fireworks Burst Celebration](docs/screenshots/02_firework_burst_celebration.png)

---

### 3. 🎫 VIP Golden Ticket 奢华金票中奖公布 (方案 B · 底部宽幅横向副券)
酒红天鹅绒质感底色、防伪冲孔撕票半圆缺口、正向横向官方存根副券、防伪条形码与底部悬浮控制胶囊：
![Golden Ticket Winner Reveal](docs/screenshots/03_golden_ticket_winner_reveal.png)

---

### 4. ✏️ 现场直接点击文字原地修改 (Inline Live Edit)
卡片上的活动名、日期、地点、副券标题等均支持鼠标直接点击原地打字修改，失焦自动持久化保存：
![Live Customized Titles](docs/screenshots/05_live_custom_edited.png)

---

### 5. ⚙️ 奖项配额与金票品牌全局定制面板 (Settings Modal)
点击底栏 `⚙️` 图标，支持全局批量配置奖品、名额、自定义文案及一键恢复出厂设置：
![Ticket Settings Modal](docs/screenshots/04_ticket_settings_modal.png)

---

### 6. 📊 候选人名单管理与 Excel/CSV 一键导入导出 (Candidate Manager)
内置离线版 SheetJS 引擎，无需后端支持，直接拖入 Excel 即可秒级导入数千人名单，支持员工真实头像上传（Base64 转码）：
| 👥 候选人名册与批量导入 | 🏆 中奖历史记录与 Excel 导出 |
| :---: | :---: |
| ![Candidate Roster](docs/screenshots/06_candidate_roster_excel.png) | ![Winners History](docs/screenshots/07_winners_history_export.png) |

---

## 💎 核心技术亮点 (Key Engineering Features)

- **🎆 60 FPS 物理烟花双重画布引擎 (Pyrotechnic Dual-Canvas)**  
  独立轨迹层与粒子爆炸层，基于 HTML5 Canvas 实现迫击炮点火引信、空气阻力、微重力衰减与多重色谱混合。
  
- **🔊 Web Audio API 程序化音频合成器 (Zero External Audio Files)**  
  纯数学算法实时合成，彻底告别音频卡顿或版权问题：
  - 引信燃烧：粉红噪声 + 带通滤波
  - 迫击炮发射：低频正弦指数下潜
  - 升空尖啸：变频振荡器高频调制
  - 爆裂震鸣：白噪声多级衰减冲激

- **🔒 100% 离线与企业数据绝对隐私 (Local-First Architecture)**  
  所有名单、工号、部门与肖像照片均在浏览器本地运算与内存中处理，**绝不上传任何第三方云端或外部服务器**，现场断网依然 100% 稳如磐石。

---

## 🚀 本地离线运行 (Run Offline Locally)

如果您在没有外网的年会保密内网环境中，也可以完全离线运行：

### 方法一：Windows 用户双击一键运行
直接双击根目录下的 **`start.bat`**，系统将自动启动轻量服务并弹出默认浏览器。

### 方法二：命令行极简启动
```bash
# 启动内置静态服务
node server.js

# 在浏览器中打开：
http://localhost:3001
```

---

## 🎮 键盘快捷键 (Keyboard Shortcuts)

| 按键 | 功能说明 |
| :--- | :--- |
| **`SPACE` (空格键)** | 发射烟花 / 抽取中奖者 / 确认领奖并抽下一位 |
| **`M` 键** | 一键开启 / 关闭全局背景盛典音效 |
| **`F` 键** | 一键切换全屏模式（适合大屏幕、投影仪展播） |
| **`ESC` 键** | 关闭当前打开的抽屉或弹窗 |

---

## 📄 授权协议 (License)

本项目采用 [MIT License](LICENSE) 开源协议。
