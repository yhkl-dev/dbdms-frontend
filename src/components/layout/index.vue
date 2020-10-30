<template>
  <div>
    <a-layout>
      <a-layout-header class="header">
        <div class="header-content"></div>
        <a class="header-logo" href="/homepage">develop</a>
        <a class="header-link" href="/document">
          <a-icon type="read" />
          <span class="title">docs</span>
        </a>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="footer">
        <div class="footer-content">@yhkl-dev</div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style lang="scss" scoped>
.header {
  border-top: 0.4em solid #4b0380;
  background-color: #fefefe;
  position: relative;
  z-index: 1;
  display: block;
}
.header::before {
  background: #50b7eb;
  left: -0.2em;
}
.header::after {
  background: #eb5050;
  right: -0.2em;
}
.header::after,
.header::before {
  content: "";
  display: block;
  height: 0.4em;
  position: absolute;
  top: -0.4em;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  width: calc(25% + 0.2em);
}
*,
*::after,
*::before {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}

.header-content {
  padding: 0 2%;
  background-color: #f2f4f5;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.header-logo {
  position: relative;
  color: #424242;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.875;
  margin: 0 1.25em 0.75em 0;
  padding-left: 2.25em;
  text-decoration: none;
}
.header-logo::before {
  background-image: url("../../assets/database.png");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  content: "";
  display: block;
  font-size: 0.75rem;
  height: 3em;
  left: 1em;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 3em;
  color: #1c9ad9;
  text-decoration: none;
}
.header-logo:visited {
  color: #424242;
}

.header-link {
  position: relative;
  color: #424242;
  flex-shrink: 0;
  font-size: 1.6rem;
  font-weight: 400;
  padding-left: 2.25em;
}
.title {
  margin-left: 0.5em;
}
.content {
  padding: 0 2%;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 6em;
  margin-top: 2.4em;
}

.footer {
  background: #f2f4f5;
  padding: 1.2em 0;
  display: block;
}
.footer-content {
  padding: 0 2%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
</style>
