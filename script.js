/**
 * 美国对刚果(金)制裁法律研究项目
 * 交互脚本
 * 创建日期：2023年9月18日
 */

document.addEventListener('DOMContentLoaded', function() {
  // 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  // 滚动监听
  window.addEventListener('scroll', function() {
    // 导航栏背景效果
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // 淡入效果
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
    
    // 当前滚动位置对应的导航链接高亮
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
  
  // 平滑滚动
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    });
  });
  
  // 初始化淡入元素
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      element.classList.add('visible');
    }
  });
  
  // 移动设备导航菜单
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navbarCollapse.classList.remove('show');
      });
    });
  }
  
  // 初始化Mermaid图表（如果存在）
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
  }
  
  // 调整iframe高度以适应内容
  function adjustIframeHeight() {
    const iframes = document.querySelectorAll('.chart-iframe');
    iframes.forEach(iframe => {
      iframe.onload = function() {
        // 尝试获取iframe内容高度
        try {
          const height = iframe.contentWindow.document.body.scrollHeight;
          iframe.style.height = `${height + 20}px`;
        } catch (e) {
          console.log('无法调整iframe高度，可能是跨域限制');
          // 设置默认高度
          iframe.style.height = '500px';
        }
      };
    });
  }
  
  // 页面加载完成后调整iframe高度
  window.addEventListener('load', adjustIframeHeight);
});