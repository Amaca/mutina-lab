(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

/* jshint esversion: 6 */
var body, header, html, isSafari, isIE11;
/*--------------------------------------------------
Init
--------------------------------------------------*/

function init() {
  html = document.documentElement;
  body = document.body;
  header = document.querySelector('.header');
}

var DirectionalLight = PIXI.lights.DirectionalLight;
var PointLight = PIXI.lights.PointLight;
var canvas = document.getElementById("canvas");
var viewWidth = 1400;
var viewHeight = 795;
var renderer = new PIXI.WebGLRenderer(viewWidth, viewHeight, {
  view: canvas
});
var stage = new PIXI.Container();
var lightCount = 1;
var lightHeight = 250;
var allLights = [];
var dirLight = new DirectionalLight({
  color: 0xffffff,
  brightness: 0.3,
  ambientColor: 0x888888,
  ambientBrightness: 1,
  position: {
    x: 0,
    y: 0,
    z: lightHeight
  },
  target: {
    x: 0,
    y: 0,
    z: 0
  }
});
var mouseLight = new PointLight({
  color: 0xffffff,
  brightness: 0.4,
  position: {
    x: viewWidth / 2,
    y: viewHeight / 2,
    z: lightHeight
  }
});
allLights.push(dirLight);
allLights.push(mouseLight);

function createClickLight(x, y) {
  var clickLight = new PointLight({
    color: 0xffffff,
    brightness: 1,
    falloff: [0.8, 6, 260],
    position: {
      x: x,
      y: y,
      z: lightHeight
    }
  });
  allLights.push(clickLight);
}

PIXI.loader.add('alien_diffuse', 'img/image.jpg').add('alien_normal', 'img/image_bg.jpg') //.add('bg_diffuse', '../img/image.jpg')
// .add('bg_normal', '../img/image_bg.jpg')
.load(function (loader, res) {
  //let bg = new PIXI.Sprite(res.bg_diffuse.texture);
  //stage.addChild(bg);
  var alien = new PIXI.Sprite(res.alien_diffuse.texture);
  alien.position.set(0, 0);
  alien.scale.set(1, 1);
  dirLight.target.x = alien.x;
  dirLight.target.y = alien.y;
  dirLight.updateDirection(); //bg.normalTexture = res.bg_normal.texture;

  alien.normalTexture = res.alien_normal.texture; //bg.pluginName = "lightSprite";

  alien.pluginName = "lightSprite"; //bg.lights = allLights;

  alien.lights = allLights;
  stage.addChild(alien);
  canvas.addEventListener('mousemove', function (e) {
    var rect = e.target.getBoundingClientRect();
    mouseLight.position.x = e.clientX - rect.left;
    mouseLight.position.y = e.clientY - rect.top;
  });
  canvas.addEventListener('click', function (e) {
    var rect = e.target.getBoundingClientRect();
    createClickLight(e.clientX - rect.left, e.clientY - rect.top);
    document.getElementById('numLights').textContent = ++lightCount;
  });
  animate();
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
/*--------------------------------------------------
Browsers
--------------------------------------------------*/


function oldBrowsers() {
  isSafari = /constructor/i.test(window.HTMLElement) || function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  }(!window['safari'] || safari.pushNotification);

  isIE11 = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);

  if (isIE11 === true) {
    html.classList.add('msie');
  }

  if (isSafari === true) {
    html.classList.add('safari');
  }
}
/*--------------------------------------------------
WIN LOAD
--------------------------------------------------*/


window.onload = function () {
  init();
  oldBrowsers();
};

},{}]},{},[1]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzcmMvanMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBqc2hpbnQgZXN2ZXJzaW9uOiA2ICovXHJcblxyXG5sZXQgYm9keSxcclxuXHRoZWFkZXIsXHJcblx0aHRtbCxcclxuXHRpc1NhZmFyaSxcclxuXHRpc0lFMTE7XHJcblxyXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbkluaXRcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5mdW5jdGlvbiBpbml0KCkge1xyXG5cdGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblx0Ym9keSA9IGRvY3VtZW50LmJvZHk7XHJcblx0aGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG59XHJcblxyXG5sZXQgRGlyZWN0aW9uYWxMaWdodCA9IFBJWEkubGlnaHRzLkRpcmVjdGlvbmFsTGlnaHQ7XHJcbmxldCBQb2ludExpZ2h0ID0gUElYSS5saWdodHMuUG9pbnRMaWdodDtcclxuXHJcbmxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcclxubGV0IHZpZXdXaWR0aCA9IDE0MDA7XHJcbmxldCB2aWV3SGVpZ2h0ID0gNzk1O1xyXG5cclxubGV0IHJlbmRlcmVyID0gbmV3IFBJWEkuV2ViR0xSZW5kZXJlcih2aWV3V2lkdGgsIHZpZXdIZWlnaHQsIHtcclxuXHR2aWV3OiBjYW52YXNcclxufSk7XHJcblxyXG5sZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxubGV0IGxpZ2h0Q291bnQgPSAxO1xyXG5cclxubGV0IGxpZ2h0SGVpZ2h0ID0gMjUwO1xyXG5sZXQgYWxsTGlnaHRzID0gW107XHJcblxyXG5sZXQgZGlyTGlnaHQgPSBuZXcgRGlyZWN0aW9uYWxMaWdodCh7XHJcblx0Y29sb3I6IDB4ZmZmZmZmLFxyXG5cdGJyaWdodG5lc3M6IDAuMyxcclxuXHRhbWJpZW50Q29sb3I6IDB4ODg4ODg4LFxyXG5cdGFtYmllbnRCcmlnaHRuZXNzOiAxLFxyXG5cdHBvc2l0aW9uOiB7XHJcblx0XHR4OiAwLFxyXG5cdFx0eTogMCxcclxuXHRcdHo6IGxpZ2h0SGVpZ2h0LFxyXG5cdH0sXHJcblx0dGFyZ2V0OiB7XHJcblx0XHR4OiAwLFxyXG5cdFx0eTogMCxcclxuXHRcdHo6IDAsXHJcblx0fVxyXG59KTtcclxuXHJcbmxldCBtb3VzZUxpZ2h0ID0gbmV3IFBvaW50TGlnaHQoe1xyXG5cdGNvbG9yOiAweGZmZmZmZixcclxuXHRicmlnaHRuZXNzOiAwLjQsXHJcblx0cG9zaXRpb246IHtcclxuXHRcdHg6IHZpZXdXaWR0aCAvIDIsXHJcblx0XHR5OiB2aWV3SGVpZ2h0IC8gMixcclxuXHRcdHo6IGxpZ2h0SGVpZ2h0LFxyXG5cdH1cclxufSk7XHJcblxyXG5hbGxMaWdodHMucHVzaChkaXJMaWdodCk7XHJcbmFsbExpZ2h0cy5wdXNoKG1vdXNlTGlnaHQpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2xpY2tMaWdodCh4LCB5KSB7XHJcblx0bGV0IGNsaWNrTGlnaHQgPSBuZXcgUG9pbnRMaWdodCh7XHJcblx0XHRjb2xvcjogMHhmZmZmZmYsXHJcblx0XHRicmlnaHRuZXNzOiAxLFxyXG5cdFx0ZmFsbG9mZjogWzAuOCwgNiwgMjYwXSxcclxuXHRcdHBvc2l0aW9uOiB7XHJcblx0XHRcdHg6IHgsXHJcblx0XHRcdHk6IHksXHJcblx0XHRcdHo6IGxpZ2h0SGVpZ2h0LFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdGFsbExpZ2h0cy5wdXNoKGNsaWNrTGlnaHQpO1xyXG59XHJcblxyXG5QSVhJLmxvYWRlclxyXG5cdC5hZGQoJ2FsaWVuX2RpZmZ1c2UnLCAnaW1nL2ltYWdlLmpwZycpXHJcblx0LmFkZCgnYWxpZW5fbm9ybWFsJywgJ2ltZy9pbWFnZV9iZy5qcGcnKVxyXG5cdC8vLmFkZCgnYmdfZGlmZnVzZScsICcuLi9pbWcvaW1hZ2UuanBnJylcclxuXHQvLyAuYWRkKCdiZ19ub3JtYWwnLCAnLi4vaW1nL2ltYWdlX2JnLmpwZycpXHJcblx0LmxvYWQoZnVuY3Rpb24obG9hZGVyLCByZXMpIHtcclxuXHRcdC8vbGV0IGJnID0gbmV3IFBJWEkuU3ByaXRlKHJlcy5iZ19kaWZmdXNlLnRleHR1cmUpO1xyXG5cdFx0Ly9zdGFnZS5hZGRDaGlsZChiZyk7XHJcblxyXG5cdFx0bGV0IGFsaWVuID0gbmV3IFBJWEkuU3ByaXRlKHJlcy5hbGllbl9kaWZmdXNlLnRleHR1cmUpO1xyXG5cclxuXHRcdGFsaWVuLnBvc2l0aW9uLnNldCgwLCAwKTtcclxuXHRcdGFsaWVuLnNjYWxlLnNldCgxLCAxKTtcclxuXHJcblx0XHRkaXJMaWdodC50YXJnZXQueCA9IGFsaWVuLng7XHJcblx0XHRkaXJMaWdodC50YXJnZXQueSA9IGFsaWVuLnk7XHJcblx0XHRkaXJMaWdodC51cGRhdGVEaXJlY3Rpb24oKTtcclxuXHJcblx0XHQvL2JnLm5vcm1hbFRleHR1cmUgPSByZXMuYmdfbm9ybWFsLnRleHR1cmU7XHJcblx0XHRhbGllbi5ub3JtYWxUZXh0dXJlID0gcmVzLmFsaWVuX25vcm1hbC50ZXh0dXJlO1xyXG5cclxuXHRcdC8vYmcucGx1Z2luTmFtZSA9IFwibGlnaHRTcHJpdGVcIjtcclxuXHRcdGFsaWVuLnBsdWdpbk5hbWUgPSBcImxpZ2h0U3ByaXRlXCI7XHJcblxyXG5cdFx0Ly9iZy5saWdodHMgPSBhbGxMaWdodHM7XHJcblx0XHRhbGllbi5saWdodHMgPSBhbGxMaWdodHM7XHJcblxyXG5cdFx0c3RhZ2UuYWRkQ2hpbGQoYWxpZW4pO1xyXG5cclxuXHRcdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdGxldCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0XHRtb3VzZUxpZ2h0LnBvc2l0aW9uLnggPSBlLmNsaWVudFggLSByZWN0LmxlZnQ7XHJcblx0XHRcdG1vdXNlTGlnaHQucG9zaXRpb24ueSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRsZXQgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdFx0Y3JlYXRlQ2xpY2tMaWdodChlLmNsaWVudFggLSByZWN0LmxlZnQsIGUuY2xpZW50WSAtIHJlY3QudG9wKTtcclxuXHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdudW1MaWdodHMnKS50ZXh0Q29udGVudCA9ICsrbGlnaHRDb3VudDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdGFuaW1hdGUoKTtcclxuXHR9KTtcclxuXHJcbmZ1bmN0aW9uIGFuaW1hdGUoKSB7XHJcblx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xyXG5cdHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuQnJvd3NlcnNcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5mdW5jdGlvbiBvbGRCcm93c2VycygpIHtcclxuXHRpc1NhZmFyaSA9IC9jb25zdHJ1Y3Rvci9pLnRlc3Qod2luZG93LkhUTUxFbGVtZW50KSB8fCAoZnVuY3Rpb24ocCkgeyByZXR1cm4gcC50b1N0cmluZygpID09PSBcIltvYmplY3QgU2FmYXJpUmVtb3RlTm90aWZpY2F0aW9uXVwiOyB9KSghd2luZG93WydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbik7XHJcblx0aXNJRTExID0gISFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9UcmlkZW50LipydlsgOl0qMTFcXC4vKTtcclxuXHJcblx0aWYgKGlzSUUxMSA9PT0gdHJ1ZSkge1xyXG5cdFx0aHRtbC5jbGFzc0xpc3QuYWRkKCdtc2llJyk7XHJcblx0fVxyXG5cdGlmIChpc1NhZmFyaSA9PT0gdHJ1ZSkge1xyXG5cdFx0aHRtbC5jbGFzc0xpc3QuYWRkKCdzYWZhcmknKTtcclxuXHR9XHJcbn1cclxuXHJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuV0lOIExPQURcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG5cdGluaXQoKTtcclxuXHRvbGRCcm93c2VycygpO1xyXG59O1xyXG4iXSwiZmlsZSI6ImRvY3NcXGpzXFxtYWluLmpzIn0=
