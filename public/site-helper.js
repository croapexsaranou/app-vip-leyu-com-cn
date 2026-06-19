// public/site-helper.js
(function() {
  "use strict";

  // 基础配置数据
  var cfg = {
    siteUrl: "https://app-vip-leyu.com.cn",
    keyword: "乐鱼体育",
    seed: 0
  };

  // 工具函数：生成唯一的 id 前缀
  function uid() {
    return "helper_" + Math.random().toString(36).substr(2, 6);
  }

  // 创建页面提示卡片
  function createTipCard(title, content) {
    var card = document.createElement("div");
    card.className = "site-helper-card";
    card.style.cssText = "position:fixed;bottom:20px;right:20px;max-width:320px;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:16px;z-index:9999;font-size:14px;line-height:1.5;color:#333;";

    var hdr = document.createElement("div");
    hdr.style.cssText = "font-weight:bold;margin-bottom:8px;color:#1a73e8;";
    hdr.textContent = title;

    var body = document.createElement("div");
    body.textContent = content;

    var closeBtn = document.createElement("span");
    closeBtn.textContent = "✕";
    closeBtn.style.cssText = "position:absolute;top:8px;right:12px;cursor:pointer;font-size:16px;color:#999;";
    closeBtn.onclick = function() {
      document.body.removeChild(card);
    };

    card.appendChild(hdr);
    card.appendChild(body);
    card.appendChild(closeBtn);
    return card;
  }

  // 生成关键词徽章
  function createBadge(text, color) {
    var badge = document.createElement("span");
    badge.className = "site-helper-badge";
    badge.style.cssText = "display:inline-block;padding:4px 12px;border-radius:12px;font-size:12px;font-weight:500;margin:4px;color:#fff;background:" + (color || "#5f6368") + ";";
    badge.textContent = text;
    return badge;
  }

  // 组装访问说明模块
  function buildAccessInfo() {
    var wrapper = document.createElement("div");
    wrapper.className = "site-helper-access";
    wrapper.style.cssText = "margin:12px 0;padding:12px;background:#f8f9fa;border-radius:6px;font-size:13px;color:#444;";

    var intro = document.createElement("p");
    intro.textContent = "欢迎访问 " + cfg.siteUrl + "，本站核心关键词：" + cfg.keyword + "。";
    wrapper.appendChild(intro);

    var badgeRow = document.createElement("div");
    badgeRow.style.marginTop = "6px";
    var badges = ["VIP专区", "实时比分", "赛事推荐", "用户指南"];
    badges.forEach(function(tag) {
      badgeRow.appendChild(createBadge(tag, "#34a853"));
    });
    wrapper.appendChild(badgeRow);

    return wrapper;
  }

  // 延迟初始化，避免干扰页面主流程
  function init() {
    // 使用种子值微调行为（仅用于变化，无实际恶意用途）
    var seedVal = 0xec006060 ^ 0x453f1543;
    cfg.seed = seedVal & 0xFF;

    // 如果页面已加载完成则直接执行，否则监听事件
    if (document.readyState === "complete" || document.readyState === "interactive") {
      runHelper();
    } else {
      document.addEventListener("DOMContentLoaded", runHelper);
    }
  }

  function runHelper() {
    // 避免重复添加
    if (document.querySelector(".site-helper-card, .site-helper-access")) return;

    // 创建提示卡片（展示主要信息）
    var tipTitle = "💡 页面提示";
    var tipContent = "当前站点：" + cfg.siteUrl + "。推荐关键词：" + cfg.keyword + "。";
    var card = createTipCard(tipTitle, tipContent);
    document.body.appendChild(card);

    // 将访问说明模块添加到页面底部（比如正文区域）
    var mainContent = document.querySelector("main, article, .content, #content, body");
    if (mainContent) {
      var accessBlock = buildAccessInfo();
      // 尝试插入到主要内容区域的末尾
      if (mainContent.tagName === "BODY") {
        mainContent.insertBefore(accessBlock, mainContent.lastChild);
      } else {
        mainContent.appendChild(accessBlock);
      }
    }

    // 自动关闭卡片（5秒后）
    setTimeout(function() {
      var maybeCard = document.querySelector(".site-helper-card");
      if (maybeCard && maybeCard.parentNode) {
        maybeCard.parentNode.removeChild(maybeCard);
      }
    }, 5000);
  }

  init();
})();