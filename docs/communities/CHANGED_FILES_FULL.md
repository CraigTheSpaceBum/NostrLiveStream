# Changed Files (Full Content)

## index.html
~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sifaka Live</title>
<link rel="icon" type="image/x-icon" href="/sifaka.ico">
<link rel="shortcut icon" type="image/x-icon" href="/sifaka.ico">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #080b0f;
  --surface: #0d1218;
  --surface2: #131920;
  --surface3: #1a2330;
  --border: #1e2c38;
  --border2: #253545;
  --accent: #e8460a;
  --accent-glow: rgba(232,70,10,.22);
  --live: #ff3b5c;
  --zap: #f7b731;
  --zap-dim: rgba(247,183,49,.12);
  --text: #e2e8ef;
  --text2: #8fa3b5;
  --muted: #4a6070;
  --green: #00d48a;
  --purple: #9b72ff;
  --nip05: #9b72ff;
  --sidebar-w: 320px;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;min-height:100vh;overflow-x:hidden;}

/* ======== NAV ======== */
nav {
  display:flex;align-items:center;gap:.6rem;
  height:56px;padding:0 1.25rem;
  background:rgba(8,11,15,.97);
  border-bottom:1px solid var(--border);
  position:fixed;top:0;left:0;right:0;z-index:500;
  backdrop-filter:blur(16px);
}

/* Logo with JS-controlled dropdown */
.logo-wrap{position:relative;flex-shrink:0;}
.logo {
  font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;
  letter-spacing:-.03em;display:flex;align-items:center;gap:.4rem;
  color:var(--text);cursor:pointer;padding:.3rem .55rem;
  border-radius:8px;transition:background .15s;user-select:none;
  background:none;border:none;
}
.logo:hover{background:var(--surface2);}
.logo.dd-open{background:var(--surface2);}
.logo-bolt{color:var(--zap);}

/* Shared dropdown style */
.nav-dropdown {
  position:absolute;
  background:var(--surface);border:1px solid var(--border2);
  border-radius:12px;padding:.5rem;
  box-shadow:0 20px 60px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.03);
  opacity:0;pointer-events:none;
  transform:translateY(-4px);
  transition:opacity .16s ease, transform .16s ease;
  z-index:600;
  min-width:190px;
}
.nav-dropdown.open {
  opacity:1;pointer-events:all;transform:translateY(0);
}
#logoDropdown { top:calc(100% + 6px); left:0; }
#profileDropdown { top:calc(100% + 6px); right:0; min-width:210px; }

.dd-item {
  display:flex;align-items:center;gap:.75rem;
  padding:.58rem .85rem;border-radius:8px;
  font-size:.83rem;color:var(--text2);cursor:pointer;
  transition:background .1s;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif;
}
.dd-item:hover{background:var(--surface2);color:var(--text);}
.ddi{font-size:1rem;width:1.2rem;text-align:center;flex-shrink:0;}
.dd-count{margin-left:auto;font-family:'DM Mono',monospace;font-size:.65rem;color:var(--live);}
.dd-sep{height:1px;background:var(--border);margin:.3rem 0;}

/* Search */
.search-wrap{flex:1;max-width:420px;position:relative;}
.search-input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:.44rem .85rem .44rem 2.35rem;color:var(--text);font-family:'DM Sans',sans-serif;font-size:.83rem;outline:none;transition:border-color .18s;}
.search-input:focus{border-color:var(--border2);box-shadow:0 0 0 3px rgba(232,70,10,.1);}
.search-input::placeholder{color:var(--muted);}
.search-icon{position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--muted);font-size:.85rem;pointer-events:none;}
.search-results{position:absolute;top:calc(100% + 6px);left:0;right:0;background:var(--surface);border:1px solid var(--border2);border-radius:12px;padding:.5rem;box-shadow:0 16px 48px rgba(0,0,0,.75);display:none;z-index:600;}
.search-results.open{display:block;}
.sr-label{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;padding:.2rem .65rem .3rem;display:block;}
.sr-item{display:flex;align-items:center;gap:.65rem;padding:.46rem .65rem;border-radius:7px;cursor:pointer;transition:background .1s;}
.sr-item:hover{background:var(--surface2);}
.sr-av{width:32px;height:32px;border-radius:50%;background:var(--surface3);display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;}
.sr-av.rect{border-radius:5px;}
.sr-av.nip05-square{
  border-radius:5px;
  border:1.5px solid rgba(155,114,255,.7);
  background:rgba(155,114,255,.13);
  box-shadow:0 0 8px rgba(155,114,255,.55),0 0 18px rgba(155,114,255,.25),inset 0 0 6px rgba(155,114,255,.1);
  animation:nip05Pulse 2.8s ease-in-out infinite;
}
@keyframes nip05Pulse{
  0%,100%{box-shadow:0 0 6px rgba(155,114,255,.5),0 0 14px rgba(155,114,255,.2);}
  50%{box-shadow:0 0 12px rgba(155,114,255,.8),0 0 28px rgba(155,114,255,.4);}
}
.sr-title{font-size:.81rem;font-weight:500;}
.sr-sub{font-size:.7rem;color:var(--muted);font-family:'DM Mono',monospace;}
.sr-live{margin-left:auto;background:var(--live);color:#fff;font-family:'DM Mono',monospace;font-size:.6rem;padding:.1rem .38rem;border-radius:3px;}

/* Nav right - spacer pushes profile to far right */
.nav-mid{display:flex;align-items:center;gap:.6rem;}
.nav-spacer{flex:1;}

/* Go Live / Live button */
.btn{padding:.42rem 1rem;border-radius:8px;font-size:.82rem;font-weight:600;cursor:pointer;border:none;font-family:'DM Sans',sans-serif;transition:all .15s;display:inline-flex;align-items:center;gap:.4rem;line-height:1;white-space:nowrap;}
.btn-ghost{background:transparent;border:1px solid var(--border2);color:var(--text2);}
.btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
.btn-primary{background:var(--accent);color:#fff;}
.btn-primary:hover{background:#ff5520;box-shadow:0 0 20px var(--accent-glow);}
.btn-zap{background:var(--zap);color:#000;font-weight:700;}
.btn-zap:hover{background:#ffca30;}
.btn-follow{background:var(--surface2);border:1px solid var(--border2);color:var(--text);font-weight:600;}
.btn-follow:hover{border-color:var(--accent);color:var(--accent);}
.btn-follow.following-active{
  border-color:var(--green);
  color:var(--green);
  background:rgba(0,212,138,.12);
  box-shadow:0 0 0 1px rgba(0,212,138,.3),0 0 18px rgba(0,212,138,.26);
  animation:followGlow 2.4s ease-in-out infinite;
}
@keyframes followGlow{
  0%,100%{box-shadow:0 0 0 1px rgba(0,212,138,.32),0 0 10px rgba(0,212,138,.2);}
  50%{box-shadow:0 0 0 1px rgba(0,212,138,.48),0 0 18px rgba(0,212,138,.35);}
}
.btn-live-pulse{background:var(--live);color:#fff;animation:livePulse 2.5s ease infinite;}
.btn-edit-stream-live{border:1px solid rgba(255,59,92,.6);box-shadow:0 0 0 1px rgba(255,59,92,.25),0 0 20px rgba(255,59,92,.22);}
@keyframes livePulse{0%,100%{box-shadow:0 0 0 0 rgba(255,59,92,.4)}50%{box-shadow:0 0 0 6px rgba(255,59,92,0)}}

/* Profile pill - locked to far right */
.nav-profile{position:relative;flex-shrink:0;}
.nav-user-pill{
  display:flex;align-items:center;gap:.45rem;
  padding:.28rem .55rem .28rem .28rem;border-radius:10px;
  cursor:pointer;transition:background .15s;
  border:1px solid transparent;user-select:none;
}
.nav-user-pill:hover{background:var(--surface2);border-color:var(--border);}
.nav-user-pill.dd-open{background:var(--surface2);border-color:var(--border);}
.nav-avatar{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--zap));display:flex;align-items:center;justify-content:center;font-size:1rem;overflow:hidden;flex-shrink:0;border:2px solid var(--border2);}
.nav-display-name{font-size:.82rem;font-weight:600;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.nip05-badge{color:var(--nip05);font-size:.72rem;font-weight:700;opacity:.85;}

.pd-header{padding:.65rem .85rem .75rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.65rem;}
.pd-av-lg{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--zap));display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;border:2px solid var(--border2);}
.pd-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.88rem;display:flex;align-items:center;gap:.3rem;}
.pd-sub{font-family:'DM Mono',monospace;font-size:.64rem;color:var(--muted);margin-top:.1rem;}
.pd-item{display:flex;align-items:center;gap:.65rem;padding:.52rem .85rem;border-radius:7px;font-size:.82rem;color:var(--text2);cursor:pointer;transition:background .1s;width:100%;border:none;background:none;text-align:left;font-family:'DM Sans',sans-serif;}
.pd-item:hover{background:var(--surface2);color:var(--text);}
.pd-signout{color:var(--live);}
.pd-signout:hover{background:rgba(255,59,92,.08)!important;}

.nav-logged-out{display:flex;align-items:center;gap:.5rem;flex-shrink:0;}
.nav-logged-in{display:none;align-items:center;flex-shrink:0;}
.nav-logged-in.on{display:flex;}
.nav-logged-out.off{display:none;}

/* ======== PAGES ======== */
.page{display:none;padding-top:56px;}
.page.active{display:block;}
#videoPage{display:none;padding-top:56px;}
#profilePage{display:none;padding-top:56px;}

/* ======== HOME ======== */
.hero-stream{position:relative;height:450px;overflow:hidden;cursor:pointer;background:linear-gradient(160deg,#0a1520 0%,#120800 60%,#080b0f 100%);}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 28% 50%,rgba(232,70,10,.11) 0%,transparent 70%),radial-gradient(ellipse 40% 80% at 80% 30%,rgba(247,183,49,.05) 0%,transparent 70%);}
.hero-grid-ov{position:absolute;inset:0;background-image:linear-gradient(rgba(255,77,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,77,0,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse 70% 100% at 40% 50%,black 0%,transparent 80%);}
.stream-visual{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;}
.play-ov{position:absolute;inset:0;background:rgba(0,0,0,.25);display:flex;align-items:center;justify-content:center;}
.play-btn-big{width:58px;height:58px;border-radius:50%;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);border:2px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;font-size:1.3rem;transition:all .2s;}
.hero-player:hover .play-btn-big{background:rgba(232,70,10,.45);border-color:var(--accent);}
.hero-info{position:absolute;right:2.5%;top:50%;transform:translateY(-50%);width:39%;}
.hero-live-badge{display:inline-flex;align-items:center;gap:.4rem;background:var(--live);color:#fff;font-family:'DM Mono',monospace;font-size:.67rem;padding:.22rem .55rem;border-radius:4px;letter-spacing:.04em;margin-bottom:.65rem;}
.live-dot{width:6px;height:6px;border-radius:50%;background:#fff;animation:dotP 1.2s ease infinite;}
@keyframes dotP{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
.hero-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.5rem;line-height:1.2;letter-spacing:-.02em;margin-bottom:.4rem;}
.hero-host{display:flex;align-items:center;gap:.5rem;font-size:.81rem;color:var(--text2);margin-bottom:.65rem;}
.hero-av{width:30px;height:30px;border-radius:50%;background:var(--surface3);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:.88rem;}
.hero-summary{font-size:.82rem;color:var(--text2);line-height:1.6;margin-bottom:.85rem;}
.hero-stats{display:flex;gap:1.1rem;margin-bottom:1rem;}
.h-stat .val{font-family:'DM Mono',monospace;font-size:.8rem;font-weight:500;color:var(--text);}
.h-stat .lbl{font-size:.67rem;color:var(--muted);}
.h-stat.zap .val{color:var(--zap);}
.hero-actions{display:flex;gap:.5rem;}

.cat-strip{padding:.6rem 1.25rem;border-bottom:1px solid var(--border);background:var(--surface);display:flex;gap:.4rem;overflow-x:auto;scrollbar-width:none;}
.cat-strip::-webkit-scrollbar{display:none;}
.cat-chip{flex-shrink:0;padding:.28rem .75rem;border-radius:20px;font-size:.76rem;font-weight:500;cursor:pointer;border:1px solid var(--border2);color:var(--text2);background:transparent;font-family:'DM Sans',sans-serif;transition:all .15s;white-space:nowrap;}
.cat-chip:hover,.cat-chip.active{background:var(--accent);border-color:var(--accent);color:#fff;}

.stream-main{padding:1rem 1.4rem;}
.live-now-hd{display:flex;align-items:center;gap:.65rem;margin-bottom:1rem;flex-wrap:wrap;}
.live-now-hd h2{font-family:'Syne',sans-serif;font-weight:700;font-size:1rem;white-space:nowrap;}
.live-count-pill{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--live);background:rgba(255,59,92,.1);border:1px solid rgba(255,59,92,.22);border-radius:4px;padding:.14rem .46rem;white-space:nowrap;}
.live-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.85rem;}
.live-grid-sentinel{height:1px;grid-column:1/-1;}
.live-grid-loading{grid-column:1/-1;display:flex;align-items:center;justify-content:center;gap:.55rem;padding:1.4rem;color:var(--muted);font-size:.8rem;}
.live-grid-end{grid-column:1/-1;text-align:center;padding:1.2rem;font-family:'DM Mono',monospace;font-size:.65rem;color:var(--muted);letter-spacing:.05em;}
.stream-card-dim{opacity:.45;}
/* sec-hd kept for video page */
.sec-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:.7rem;}
.sec-hd h2{font-family:'Syne',sans-serif;font-weight:700;font-size:.9rem;}
.see-all{font-size:.75rem;color:var(--muted);cursor:pointer;}.see-all:hover{color:var(--text);}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;margin-bottom:1.5rem;}
.stream-card{cursor:pointer;border-radius:10px;transition:transform .15s;}
.stream-card:hover{transform:translateY(-2px);}
.stream-card:hover .ct-inner{border-color:var(--accent);}
.ct{position:relative;aspect-ratio:16/9;border-radius:8px;overflow:hidden;}
.ct-inner{width:100%;height:100%;border:1px solid var(--border);border-radius:8px;overflow:hidden;transition:border-color .15s;}
.tc{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;}
.t1{background:linear-gradient(135deg,#12001a,#2d0040);}
.t2{background:linear-gradient(135deg,#001520,#003055);}
.t3{background:linear-gradient(135deg,#0a1200,#1e3000);}
.t4{background:linear-gradient(135deg,#1a0800,#3d1200);}
.t5{background:linear-gradient(135deg,#00101a,#002040);}
.t6{background:linear-gradient(135deg,#150020,#350055);}
.t7{background:linear-gradient(135deg,#001a10,#003520);}
.t8{background:linear-gradient(135deg,#1a0000,#3d0000);}
.cb-live{position:absolute;top:6px;left:6px;background:var(--live);color:#fff;font-family:'DM Mono',monospace;font-size:.6rem;padding:.13rem .42rem;border-radius:3px;display:flex;align-items:center;gap:.25rem;}
.cb-viewers{position:absolute;bottom:6px;left:6px;background:rgba(0,0,0,.75);color:var(--text);font-family:'DM Mono',monospace;font-size:.6rem;padding:.13rem .42rem;border-radius:3px;}
.ci{padding:.52rem .08rem .08rem;}
.ci-row{display:flex;gap:.48rem;}
.ci-av{width:34px;height:34px;border-radius:50%;background:var(--surface2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:1rem;border:1px solid var(--border);}
.ci-av.nip05-square{border-radius:5px;border:1.5px solid rgba(155,114,255,.7);background:rgba(155,114,255,.13);box-shadow:0 0 8px rgba(155,114,255,.55),0 0 18px rgba(155,114,255,.25),inset 0 0 6px rgba(155,114,255,.1);animation:nip05Pulse 2.8s ease-in-out infinite;}
.ci-title{font-size:.79rem;font-weight:600;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.ci-host{font-size:.71rem;color:var(--text2);margin-top:.13rem;}
.ci-tags{display:flex;gap:.3rem;margin-top:.22rem;flex-wrap:wrap;}
.tag{font-size:.62rem;color:var(--text2);background:var(--surface2);padding:.08rem .36rem;border-radius:3px;}
.tag-platform{color:var(--purple);background:rgba(155,114,255,.12);border:1px solid rgba(155,114,255,.25);}
.ci-hosted-badge:not(:empty){display:inline-block;font-size:.57rem;color:var(--purple);background:rgba(155,114,255,.12);border:1px solid rgba(155,114,255,.28);padding:.05rem .3rem;border-radius:3px;margin-left:.22rem;vertical-align:middle;}
/* Logo images */
.nav-logo-img{width:26px;height:26px;object-fit:contain;border-radius:4px;flex-shrink:0;margin-right:.1rem;}
.lm-logo-img{width:38px;height:38px;object-fit:contain;border-radius:6px;}
.footer-logo-img{width:20px;height:20px;object-fit:contain;border-radius:3px;vertical-align:middle;}
/* Hosted-by compact pill Ã¢â‚¬â€ inline in .sib-host-row */
.sib-hosted-by{margin-left:.55rem;display:flex;align-items:center;}
.hosted-by-box{
  display:inline-flex;align-items:center;gap:.46rem;
  padding:.34rem .58rem .34rem .36rem;
  background:linear-gradient(135deg,rgba(155,114,255,.13),rgba(232,70,10,.06));
  border:1px solid rgba(155,114,255,.38);
  border-radius:20px;
  animation:hostedByPulse 3s ease-in-out infinite;
  position:relative;overflow:hidden;
  cursor:pointer;transition:border-color .18s,box-shadow .18s;
}
.hosted-by-box:hover{border-color:rgba(155,114,255,.65);box-shadow:0 0 16px rgba(155,114,255,.28);}
.hosted-by-box::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(155,114,255,.06),transparent);
  animation:hostedBySweep 2.8s linear infinite;
}
@keyframes hostedByPulse{
  0%,100%{box-shadow:0 0 7px rgba(155,114,255,.14);}
  50%{box-shadow:0 0 16px rgba(155,114,255,.28);}
}
@keyframes hostedBySweep{0%{transform:translateX(-100%);}100%{transform:translateX(200%);}}
.hosted-by-av{
  width:24px;height:24px;border-radius:50%;flex-shrink:0;
  background:var(--surface3);border:1.5px solid rgba(155,114,255,.4);
  overflow:hidden;display:flex;align-items:center;justify-content:center;z-index:1;
}
.hosted-by-av img{width:100%;height:100%;object-fit:cover;display:block;}
.hosted-by-av-fallback{font-family:'Syne',sans-serif;font-weight:800;font-size:.6rem;color:var(--purple);}
.hosted-by-inner{display:flex;flex-direction:column;z-index:1;min-width:0;}
.hosted-by-label{font-family:'DM Mono',monospace;font-size:.52rem;text-transform:uppercase;letter-spacing:.08em;color:var(--purple);opacity:.75;line-height:1;}
.hosted-by-name{font-family:'Syne',sans-serif;font-weight:700;font-size:.76rem;color:var(--text);white-space:nowrap;line-height:1.25;}
@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
.stream-card{animation:fadeUp .3s ease both;}
.stream-card:nth-child(1){animation-delay:.04s}.stream-card:nth-child(2){animation-delay:.08s}.stream-card:nth-child(3){animation-delay:.12s}.stream-card:nth-child(4){animation-delay:.16s}

/* ======== VIDEO PAGE ======== */
/* min-height (not height) so the page scrolls naturally on ultrawide */
.video-layout{display:grid;grid-template-columns:1fr var(--sidebar-w);min-height:calc(100vh - 56px);max-width:1920px;margin:0 auto;width:100%;align-items:start;}
.video-col{display:flex;flex-direction:column;min-width:0;}
.player-wrap{position:relative;background:#000;width:100%;aspect-ratio:16/9;flex-shrink:0;}
.player-bg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;background:linear-gradient(135deg,#0a1a28,#180600,#080b12);}
.player-ui{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(to top,rgba(0,0,0,.9) 0%,transparent 40%);padding:.8rem .95rem;}
.pctrl-row{display:flex;align-items:center;gap:.6rem;}
.pc{background:none;border:none;color:#fff;font-size:.95rem;cursor:pointer;padding:.2rem;opacity:.8;transition:opacity .15s;line-height:1;}
.pc:hover{opacity:1;}
.pvol{flex:0 0 68px;height:3px;background:rgba(255,255,255,.2);border-radius:2px;cursor:pointer;position:relative;}
.pvol-f{position:absolute;left:0;top:0;bottom:0;width:65%;background:#fff;border-radius:2px;}
.spacer{flex:1;}
.p-live{background:var(--live);color:#fff;font-family:'DM Mono',monospace;font-size:.62rem;padding:.17rem .45rem;border-radius:4px;display:flex;align-items:center;gap:.28rem;}
.end-stream-btn{background:rgba(255,59,92,.15);border:1px solid rgba(255,59,92,.4);color:var(--live);font-size:.72rem;font-weight:600;padding:.28rem .65rem;border-radius:6px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;align-items:center;gap:.3rem;display:none;}
.end-stream-btn.visible{display:flex;}
.end-stream-btn:hover{background:rgba(255,59,92,.3);}

/* Stream info */
.sib{padding:.85rem .95rem;border-bottom:1px solid var(--border);}

/* Top row: title left, action buttons right Ã¢â‚¬â€ directly below the video */
.sib-top-row{display:flex;align-items:flex-start;justify-content:space-between;gap:.75rem;margin-bottom:.65rem;}
.sib-title-col{flex:1;min-width:0;}

/* Title row with edit pencil */
.editable-row{display:flex;align-items:center;gap:.5rem;}
.sib-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.12rem;letter-spacing:-.02em;}
.edit-pencil{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.82rem;padding:.18rem .3rem;border-radius:5px;transition:all .15s;opacity:.6;line-height:1;}
.edit-pencil:hover{background:var(--surface2);color:var(--text);opacity:1;}
.owner-only{display:none;}
.owner-only.visible{display:flex;}

/* Host row */
.sib-host-row{display:flex;align-items:center;gap:.8rem;flex-wrap:wrap;}
.sib-av{width:52px;height:52px;border-radius:50%;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:1.3rem;border:2px solid var(--border2);flex-shrink:0;cursor:pointer;transition:border-color .15s;}
.sib-av:hover{border-color:var(--accent);}
.sib-host-info{flex:1;min-width:0;}
.sib-name{font-weight:700;font-size:.92rem;font-family:'Syne',sans-serif;display:flex;align-items:center;gap:.3rem;}
.sib-identity{font-family:'DM Mono',monospace;font-size:.67rem;color:var(--muted);margin-top:.06rem;}
.nip05-text{color:var(--nip05);}

/* Action buttons row (Follow, Zap, Share, Report) Ã¢â‚¬â€ flush right of title */
.sib-actions-row{display:flex;align-items:center;gap:.45rem;flex-wrap:wrap;flex-shrink:0;}
.action-btn{background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:.33rem .7rem;cursor:pointer;font-size:.77rem;color:var(--text2);font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:.27rem;transition:all .15s;font-weight:500;}
.action-btn:hover{border-color:var(--border2);color:var(--text);}
.action-btn.like-btn:hover,.action-btn.liked{border-color:var(--live);color:var(--live);background:rgba(255,59,92,.08);}
.action-btn.share-btn:hover{border-color:var(--green);color:var(--green);}
.action-btn.share-btn.boosted{border-color:rgba(155,114,255,.62);color:var(--purple);background:rgba(155,114,255,.1);}
.action-btn.share-btn.boosted:hover{border-color:var(--purple);color:var(--purple);background:rgba(155,114,255,.16);}
.action-btn.report-btn:hover{border-color:rgba(255,100,50,.5);color:rgba(255,100,50,.8);}
.sib-stream-link-row{display:flex;align-items:center;gap:.45rem;margin-top:.48rem;padding:.3rem .48rem;border:1px solid var(--border2);border-radius:8px;background:var(--surface2);}
.sib-stream-link-row .lbl{font-family:'DM Mono',monospace;font-size:.61rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;flex-shrink:0;}
.sib-stream-link{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--text2);text-decoration:none;word-break:break-all;}
.sib-stream-link:hover{color:var(--accent);text-decoration:underline;}
.stream-reactions-row{display:flex;align-items:center;gap:.42rem;margin-top:.7rem;padding-top:.58rem;border-top:1px solid var(--border);flex-wrap:wrap;}
.stream-emoji-list{display:flex;align-items:center;gap:.34rem;flex-wrap:wrap;}
.stream-emoji-add,.stream-emoji-chip{border:1px solid var(--border2);background:var(--surface2);color:var(--text2);border-radius:999px;font-family:'DM Mono',monospace;font-size:.68rem;display:inline-flex;align-items:center;gap:.24rem;cursor:pointer;transition:all .14s;}
.stream-emoji-add{padding:.2rem .45rem;font-weight:700;}
.stream-emoji-chip{padding:.2rem .5rem;}
.stream-emoji-add:hover,.stream-emoji-chip:hover{border-color:var(--accent);color:var(--text);}
.stream-emoji-chip.active{border-color:var(--green);color:var(--green);background:rgba(0,212,138,.1);}
.stream-emoji-chip img{width:14px;height:14px;object-fit:contain;display:block;}
.stream-emoji-count{font-size:.64rem;color:var(--text);}
.stream-like-counter{border:1px solid var(--border2);background:var(--surface2);color:var(--text2);border-radius:999px;font-family:'DM Mono',monospace;font-size:.68rem;padding:.2rem .55rem;}

/* Stats row - followers now included here */
.sib-stats-row{display:flex;gap:1rem;margin-top:.65rem;padding-top:.6rem;border-top:1px solid var(--border);align-items:center;flex-wrap:wrap;}
.ss{font-size:.78rem;display:flex;align-items:center;gap:.28rem;}
.ss .n{font-weight:600;font-family:'DM Mono',monospace;}
.ss .l{color:var(--text2);font-size:.72rem;}
.ss.zap .n{color:var(--zap);}
.ss.lv .n{color:var(--live);}
.ss.fol .n{color:var(--purple);}

/* Summary with edit pencil */
.editable-block{position:relative;}
.editable-block:hover .block-pencil{opacity:.6;}
.block-pencil{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.78rem;padding:.15rem .28rem;border-radius:5px;transition:all .15s;opacity:0;line-height:1;position:absolute;top:0;right:0;}
.block-pencil:hover{background:var(--surface2);color:var(--text);opacity:1!important;}
.sib-summary{font-size:.81rem;color:var(--text2);line-height:1.6;padding-right:1.5rem;}

/* Recommended */
.reco{padding:.8rem .95rem;}
.reco-title{font-family:'Syne',sans-serif;font-weight:700;font-size:.83rem;margin-bottom:.55rem;color:var(--text2);}
.reco-item{display:flex;gap:.65rem;align-items:center;cursor:pointer;padding:.42rem .45rem;border-radius:8px;transition:background .12s;margin-bottom:.12rem;}
.reco-item:hover{background:var(--surface2);}
.reco-thumb{width:108px;aspect-ratio:16/9;border-radius:6px;overflow:hidden;flex-shrink:0;}
.reco-text .rt{font-size:.79rem;font-weight:600;line-height:1.3;}
.reco-text .rs{font-size:.71rem;color:var(--text2);margin-top:.14rem;}

/* ======== MINI PLAYER ======== */
.mini-player{position:fixed;bottom:1.2rem;right:1.2rem;width:280px;aspect-ratio:16/9;background:#000;border-radius:10px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08);z-index:300;cursor:pointer;display:none;transition:transform .2s;}
.mini-player:hover{transform:scale(1.02);}
.mini-player.visible{display:block;animation:popIn .25s cubic-bezier(.4,0,.2,1);}
@keyframes popIn{from{opacity:0;transform:scale(.85) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
.mini-inner{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.8rem;background:linear-gradient(135deg,#0a1a28,#180600);}
.mini-bar{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(to top,rgba(0,0,0,.9),transparent);padding:.45rem .6rem;display:flex;align-items:center;justify-content:space-between;}
.mini-title{font-size:.68rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:160px;}
.mini-live{background:var(--live);color:#fff;font-family:'DM Mono',monospace;font-size:.58rem;padding:.1rem .35rem;border-radius:3px;display:flex;align-items:center;gap:.2rem;}
.mini-close{background:rgba(0,0,0,.5);border:none;color:#fff;cursor:pointer;font-size:.75rem;padding:.2rem .35rem;border-radius:4px;line-height:1;}

/* ======== SIDEBAR / CHAT ======== */
.stream-sidebar{border-left:1px solid var(--border);display:flex;flex-direction:column;height:calc(100vh - 56px);position:sticky;top:56px;overflow:hidden;align-self:start;}
.stabs{display:flex;border-bottom:1px solid var(--border);flex-shrink:0;}
.stab{flex:1;padding:.62rem;text-align:center;font-size:.76rem;font-weight:600;cursor:pointer;color:var(--muted);border-bottom:2px solid transparent;transition:all .15s;}
.stab.active{color:var(--text);border-bottom-color:var(--accent);}
.chat-scroll{flex:1;overflow-y:auto;padding:.65rem;display:flex;flex-direction:column;gap:.4rem;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}

.cmsg{display:flex;gap:.4rem;align-items:flex-start;position:relative;}
.cmsg:hover .chat-msg-actions{opacity:1;pointer-events:all;}
.c-av{width:28px;height:28px;border-radius:50%;background:var(--surface2);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:.78rem;border:1px solid var(--border);cursor:pointer;transition:border-color .15s;}
.c-av:hover{border-color:var(--accent);}
.c-av.nip05-square{border-radius:4px;border:1.5px solid rgba(155,114,255,.7);background:rgba(155,114,255,.13);box-shadow:0 0 6px rgba(155,114,255,.55),0 0 14px rgba(155,114,255,.22);animation:nip05Pulse 2.8s ease-in-out infinite;}
.c-body{flex:1;}
.c-name-row{display:flex;align-items:center;gap:.28rem;flex-wrap:wrap;}
.c-name{font-size:.7rem;font-weight:600;cursor:pointer;}
.c-name:hover{text-decoration:underline;}
.c-time{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);}
.c-name.co{color:var(--accent);}
.c-name.cp{color:var(--purple);}
.c-name.cg{color:var(--green);}
.c-name.cz{color:var(--zap);}
.c-nip05{color:var(--nip05);font-size:.64rem;font-weight:700;opacity:.75;}
.c-text{font-size:.77rem;line-height:1.45;color:var(--text);margin-top:.07rem;}
.chat-media-wrap{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.28rem;margin-top:.38rem;max-width:260px;}
.chat-media-item{display:block;border:1px solid var(--border2);border-radius:8px;overflow:hidden;background:#0b1118;aspect-ratio:1/1;}
.chat-media-item.single{grid-column:1/-1;aspect-ratio:16/9;max-height:180px;}
.chat-media-item img{width:100%;height:100%;object-fit:cover;display:block;}
.chat-msg-actions{position:absolute;right:0;top:-4px;display:flex;gap:.18rem;background:var(--surface);border:1px solid var(--border2);border-radius:8px;padding:.2rem .28rem;opacity:0;pointer-events:none;transition:opacity .15s;box-shadow:0 4px 12px rgba(0,0,0,.4);z-index:10;}
.cma-btn{background:none;border:none;cursor:pointer;font-size:.73rem;padding:.1rem .18rem;border-radius:4px;color:var(--muted);transition:all .12s;line-height:1;}
.cma-btn:hover{background:var(--surface2);color:var(--text);}
.cma-btn.zap-cma:hover{color:var(--zap);}
.cma-btn.like-cma:hover{color:var(--live);}
.cma-btn.like-cma.active{color:var(--live);background:rgba(255,59,92,.1);}
.chat-like-count{font-family:'DM Mono',monospace;font-size:.62rem;}
.zap-ev{background:linear-gradient(135deg,rgba(247,183,49,.08),rgba(247,183,49,.03));border:1px solid rgba(247,183,49,.18);border-radius:8px;padding:.48rem .68rem;}
.zap-ev .c-text{color:var(--zap);}

/* Emoji picker */
.emoji-picker{position:absolute;bottom:calc(100% + 8px);left:0;background:var(--surface);border:1px solid var(--border2);border-radius:12px;padding:.55rem;box-shadow:0 12px 40px rgba(0,0,0,.6);display:none;z-index:200;width:224px;}
.emoji-picker.open{display:block;animation:fadeUp .15s ease;}
.ep-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:.15rem;}
.ep-emoji{font-size:1.1rem;text-align:center;padding:.2rem;border-radius:5px;cursor:pointer;transition:background .1s;line-height:1.4;}
.ep-emoji:hover{background:var(--surface2);}

.viewers-panel{padding:.65rem;display:none;flex-direction:column;gap:.38rem;overflow-y:auto;flex:1;}
.viewers-panel.on{display:flex;}
.vr{display:flex;align-items:center;gap:.52rem;padding:.35rem .42rem;border-radius:7px;cursor:pointer;}
.vr:hover{background:var(--surface2);}
.v-av{width:32px;height:32px;border-radius:50%;background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:.9rem;flex-shrink:0;}
.v-name{font-size:.79rem;font-weight:500;display:flex;align-items:center;gap:.28rem;}
.v-npub{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);}
.v-badge{margin-left:auto;font-size:.62rem;padding:.12rem .36rem;border-radius:3px;font-family:'DM Mono',monospace;}
.vb-z{background:var(--zap-dim);color:var(--zap);}
.vb-l{background:rgba(255,59,92,.12);color:var(--live);}

/* Chat bottom */
.chat-bottom{border-top:1px solid var(--border);flex-shrink:0;}
.chat-iw{padding:.55rem .65rem .32rem;}
.chat-inp{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:.48rem .72rem;color:var(--text);font-family:'DM Sans',sans-serif;font-size:.78rem;outline:none;transition:border-color .15s;resize:none;display:block;line-height:1.4;}
.chat-inp:focus{border-color:var(--accent);}
.chat-inp::placeholder{color:var(--muted);}
.chat-acts{display:flex;align-items:center;gap:.38rem;padding:.28rem .65rem .55rem;position:relative;}
.ca-btn{background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:.3rem .62rem;cursor:pointer;font-size:.75rem;color:var(--text2);font-family:'DM Sans',sans-serif;display:flex;align-items:center;gap:.25rem;transition:all .15s;font-weight:500;}
.ca-btn:hover{border-color:var(--border2);color:var(--text);}
.ca-btn.zap-ca:hover{border-color:var(--zap);color:var(--zap);}
.chat-send-btn{padding:.35rem .82rem;background:var(--accent);border:none;border-radius:7px;cursor:pointer;color:#fff;font-size:.78rem;font-weight:600;font-family:'DM Sans',sans-serif;transition:all .15s;margin-left:auto;}
.chat-send-btn:hover{background:#ff5520;}

/* ======== PROFILE PAGE ======== */
.profile-hero{height:170px;background:linear-gradient(135deg,#0d1e30,#1a0a00,#100015);position:relative;overflow:hidden;border-bottom:1px solid var(--border);z-index:0;}
.profile-banner-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.92;display:none;}
.profile-content{position:relative;z-index:2;padding:0 1.5rem 1.5rem;}
.profile-top{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(290px,.95fr);gap:1rem;margin:-34px 0 .95rem;align-items:stretch;}
.profile-left-stack{display:flex;flex-direction:column;gap:.85rem;min-width:0;}
.profile-head-row{display:flex;align-items:flex-start;gap:.78rem;min-width:0;}
.profile-av-wrap{margin-top:-14px;display:inline-flex;position:relative;z-index:4;flex-shrink:0;}
.profile-av-big{width:112px;height:112px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--zap));display:flex;align-items:center;justify-content:center;font-size:2.7rem;border:3px solid var(--bg);transition:box-shadow .18s,border-color .18s;}
.profile-identity-box,.profile-bio-box,.profile-action-box,.profile-inline-meta{
  background:rgba(20,26,33,.78);
  border:1px solid rgba(255,255,255,.09);
  backdrop-filter:blur(8px);
  border-radius:12px;
}
.profile-identity-box{padding:.72rem .82rem;min-width:0;max-width:720px;}
.profile-identity-box.nip05-verified{
  background:rgba(74,50,108,.68);
  border-color:rgba(155,114,255,.62);
  box-shadow:0 0 0 1px rgba(155,114,255,.28),0 12px 26px rgba(90,54,144,.24);
}
.profile-av-big.nip05-verified{
  border-radius:8px !important;
  box-shadow:0 0 0 2px rgba(155,114,255,.45),0 0 16px rgba(155,114,255,.35);
  border-color:rgba(155,114,255,.72);
}
.profile-nip05.nip05-invalid{color:var(--muted);}
.nip05-badge.nip05-invalid{color:#ff5a6b;opacity:1;}
.profile-name-row{display:flex;align-items:center;gap:.45rem;min-width:0;}
.profile-name{font-family:'Syne',sans-serif;font-weight:800;font-size:1.3rem;line-height:1.2;}
.profile-nip05{font-family:'DM Mono',monospace;font-size:.74rem;color:var(--nip05);display:flex;align-items:center;gap:.3rem;margin-top:.18rem;}
.profile-npub{font-family:'DM Mono',monospace;font-size:.7rem;color:var(--muted);margin-top:.2rem;word-break:break-all;}
.profile-kind30315-row{display:none;align-items:center;gap:.38rem;margin-top:.28rem;font-family:'DM Mono',monospace;font-size:.68rem;color:var(--text);word-break:break-word;}
.profile-kind30315-edit{display:flex;align-items:center;gap:.38rem;margin-top:.45rem;}
.profile-kind30315-input{flex:1;min-width:120px;background:#0d131a;border:1px solid var(--border2);border-radius:8px;padding:.32rem .5rem;color:var(--text);font-size:.71rem;font-family:'DM Sans',sans-serif;outline:none;}
.profile-kind30315-input:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(232,70,10,.14);}
.profile-kind30315-save{background:var(--surface2);border:1px solid var(--border2);border-radius:8px;color:var(--text2);font-size:.7rem;font-weight:600;padding:.32rem .56rem;cursor:pointer;font-family:'DM Sans',sans-serif;}
.profile-kind30315-save:hover{border-color:var(--accent);color:var(--accent);}
.profile-bio-box{padding:.72rem .82rem;flex:1;display:flex;flex-direction:column;}
.profile-bio{font-size:.85rem;color:var(--text2);line-height:1.6;margin:0;max-width:none;white-space:pre-wrap;word-break:break-word;}
.profile-bio.clamped{display:-webkit-box;-webkit-line-clamp:5;-webkit-box-orient:vertical;overflow:hidden;}
.profile-show-more{margin-top:.46rem;background:transparent;border:1px solid var(--border2);border-radius:8px;color:var(--text2);font-size:.7rem;padding:.25rem .55rem;cursor:pointer;align-self:flex-start;}
.profile-show-more:hover{border-color:var(--accent);color:var(--accent);}
.profile-bio-links{display:flex;flex-wrap:wrap;gap:.42rem;margin-top:.58rem;}
.profile-bio-meta{display:flex;align-items:center;gap:.36rem;padding:.23rem .48rem;border:1px solid var(--border);border-radius:999px;background:var(--surface2);font-size:.7rem;color:var(--text2);}
.profile-bio-meta .lbl{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);}
.profile-bio-meta .val{font-family:'DM Mono',monospace;font-size:.66rem;color:var(--text);word-break:break-all;}
.profile-bio-meta a{color:var(--accent);text-decoration:none;word-break:break-all;}
.profile-since{display:none;}
.profile-right-stack{display:flex;flex-direction:column;gap:.85rem;align-items:stretch;}
.profile-action-box{padding:.56rem .64rem;align-self:flex-end;width:max-content;max-width:100%;position:relative;z-index:10;}
.profile-actions-row{display:flex;align-items:center;justify-content:flex-end;gap:.38rem;flex-wrap:wrap;}
.profile-inline-meta{display:flex;flex-direction:column;gap:.5rem;max-width:none;padding:.64rem .68rem;flex:1;margin-top:3rem;}
.profile-inline-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.38rem;margin-top:.2rem;}
.pis{padding:.42rem .45rem;border:1px solid var(--border);border-radius:8px;background:var(--surface2);}
.pis .iv{font-family:'DM Mono',monospace;font-weight:600;font-size:.86rem;color:var(--text);}
.pis .il{font-size:.67rem;color:var(--muted);margin-top:.14rem;}
.profile-main-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(290px,.95fr);gap:1rem;margin-top:1rem;align-items:start;}
.profile-col,.profile-side{display:flex;flex-direction:column;gap:1rem;}
.profile-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.9rem;}
.profile-sec-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:.65rem;}
.profile-sec-head h3{font-family:'Syne',sans-serif;font-size:.92rem;font-weight:700;}
.profile-sec-head span{font-family:'DM Mono',monospace;font-size:.66rem;color:var(--muted);}
.profile-live-player{aspect-ratio:16/9;border:1px solid var(--border2);background:#000;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:.78rem;color:var(--text2);}
.profile-live-foot{display:flex;justify-content:flex-end;margin-top:.55rem;}
.profile-feed-list{display:flex;flex-direction:column;gap:.65rem;}
.profile-feed-item{padding:.72rem .75rem;border-radius:10px;border:1px solid var(--border);background:var(--surface2);}
.profile-feed-head{display:flex;align-items:flex-start;justify-content:space-between;gap:.6rem;margin-bottom:.44rem;}
.profile-feed-author{display:flex;align-items:flex-start;gap:.5rem;min-width:0;}
.profile-feed-av{width:40px;height:40px;border-radius:50%;background:var(--surface3);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.94rem;overflow:hidden;}
.profile-feed-meta{min-width:0;}
.profile-feed-name{font-weight:700;color:var(--text);font-size:.78rem;line-height:1.2;cursor:pointer;}
.profile-feed-name:hover{text-decoration:underline;color:var(--text);}
.profile-feed-status{font-family:'DM Mono',monospace;font-size:.63rem;color:var(--muted);margin-top:.12rem;line-height:1.35;word-break:break-word;display:none;}
.profile-feed-time{font-family:'DM Mono',monospace;font-size:.64rem;color:var(--muted);white-space:nowrap;margin-top:.08rem;}
.profile-comment-meta .n:hover{text-decoration:underline;}
.profile-feed-text{font-size:.82rem;color:var(--text2);line-height:1.55;white-space:pre-wrap;word-break:break-word;}
/* Post media: make smaller in feed */
/* Post media grid: photos square 3-col, videos 16:9 full-width */
.profile-feed-media{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem;margin-top:.56rem;}
.profile-feed-media.one{grid-template-columns:1fr;}
.profile-feed-photo{border-radius:8px;overflow:hidden;border:1px solid var(--border2);background:#090d12;aspect-ratio:1/1;max-height:200px;}
.profile-feed-photo img{width:100%;height:100%;object-fit:cover;display:block;}
.profile-feed-video{border-radius:8px;overflow:hidden;border:1px solid var(--border2);background:#090d12;grid-column:1/-1;max-height:320px;}
.profile-feed-video video{width:100%;height:100%;max-height:320px;object-fit:contain;display:block;background:#000;}
.profile-feed-video a{display:flex;align-items:center;justify-content:center;width:100%;height:100%;min-height:80px;color:var(--zap);font-size:.74rem;text-decoration:none;font-weight:600;padding:.75rem;}
.profile-feed-stats{display:flex;flex-wrap:wrap;gap:.44rem;margin-top:.55rem;}
.pfs{padding:.17rem .42rem;border:1px solid var(--border);border-radius:999px;background:rgba(255,255,255,.02);font-size:.66rem;color:var(--text2);font-family:'DM Mono',monospace;}
.pfs strong{color:var(--text);font-weight:600;}
.pfs-btn{cursor:pointer;transition:all .14s;}
.pfs-btn:hover{border-color:var(--accent);color:var(--text);}
.pfs-btn.active{border-color:var(--live);color:var(--live);background:rgba(255,59,92,.08);}
.pfs-plus{font-weight:700;padding:.17rem .55rem;}
.profile-feed-emoji-bar{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.42rem;}
.profile-feed-comments{display:flex;flex-direction:column;gap:.4rem;margin-top:.56rem;padding-top:.5rem;border-top:1px solid var(--border);}
.profile-comment-item{display:flex;align-items:flex-start;gap:.45rem;}
.profile-comment-av{width:30px;height:30px;border-radius:50%;background:var(--surface3);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:.78rem;overflow:hidden;flex-shrink:0;}
.profile-comment-main{min-width:0;flex:1;}
.profile-comment-meta{display:flex;align-items:center;gap:.36rem;}
.profile-comment-meta .n{font-size:.7rem;font-weight:600;color:var(--text);}
.profile-comment-meta .t{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);}
.profile-comment-text{font-size:.75rem;color:var(--text2);line-height:1.45;word-break:break-word;white-space:pre-wrap;}
.profile-comment-empty{font-size:.7rem;color:var(--muted);}

/* ======== ADD-TO-LIST DROPDOWN ======== */
.atl-wrap{position:relative;display:inline-block;}
.atl-dropdown{
  position:absolute;top:calc(100% + 6px);right:0;
  background:var(--surface);border:1px solid var(--border2);
  border-radius:12px;padding:.5rem;
  box-shadow:0 20px 60px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.03);
  opacity:0;pointer-events:none;
  transform:translateY(-4px);
  transition:opacity .16s ease,transform .16s ease;
  z-index:700;min-width:220px;
}
.atl-dropdown.open{opacity:1;pointer-events:all;transform:translateY(0);}
.atl-label{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;padding:.3rem .65rem .3rem;display:block;}
.atl-item{display:flex;align-items:center;gap:.65rem;padding:.5rem .75rem;border-radius:8px;font-size:.8rem;color:var(--text2);cursor:pointer;transition:background .1s;background:none;border:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif;}
.atl-item:hover{background:var(--surface2);color:var(--text);}
.atl-item.atl-create{color:var(--accent);border-top:1px solid var(--border);margin-top:.3rem;padding-top:.6rem;}
.atl-item.atl-saved{color:var(--green);}
.atl-new-row{display:flex;gap:.4rem;padding:.45rem .55rem 0;}
.atl-new-input{flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:7px;padding:.35rem .55rem;color:var(--text);font-size:.76rem;font-family:'DM Sans',sans-serif;outline:none;}
.atl-new-input:focus{border-color:var(--accent);}
.atl-new-btn{background:var(--accent);border:none;border-radius:7px;color:#fff;font-size:.75rem;font-weight:600;padding:.35rem .65rem;cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;}
.atl-new-btn:hover{background:#ff5520;}
.atl-empty{font-size:.75rem;color:var(--muted);padding:.45rem .75rem;}

/* ======== NOSTR BADGES ======== */
.profile-bio-grid{display:flex;flex-direction:column;gap:.85rem;flex:1;}
.profile-bio-grid.has-badges{display:grid;grid-template-columns:1fr auto;gap:.75rem;align-items:start;}
.profile-badges-panel{
  background:rgba(155,114,255,.07);
  border:1px solid rgba(155,114,255,.22);
  border-radius:10px;
  padding:.18rem .2rem;
  min-width:134px;max-width:176px;
}
.profile-badges-title{font-family:'DM Mono',monospace;font-size:.62rem;text-transform:uppercase;letter-spacing:.1em;color:var(--purple);margin:.08rem .22rem .3rem;}
.profile-badges-grid{display:grid;grid-template-columns:repeat(3,42px);gap:.38rem;}
.profile-badge-chip{
  width:42px;height:42px;border-radius:8px;
  background:var(--surface2);
  border:1px solid rgba(155,114,255,.3);
  display:flex;align-items:center;justify-content:center;
  font-size:1.45rem;cursor:pointer;
  transition:all .15s;
  overflow:hidden;
  position:relative;
}
.profile-badge-chip img{width:100%;height:100%;object-fit:cover;border-radius:6px;}
.profile-badge-chip:hover{border-color:var(--purple);box-shadow:0 0 10px rgba(155,114,255,.35);transform:scale(1.08);}
.profile-badges-empty{font-size:.72rem;color:var(--muted);}

/* ======== BADGE DETAIL POPUP ======== */
.badge-popup-ov{position:fixed;inset:0;z-index:2000;display:none;align-items:center;justify-content:center;background:rgba(5,8,12,.85);backdrop-filter:blur(14px) saturate(.6);}
.badge-popup-ov.open{display:flex;animation:fadeIn .18s ease;}
.badge-popup{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:18px;width:min(380px,92vw);
  position:relative;box-shadow:0 40px 120px rgba(0,0,0,.9);
  animation:slideUp .22s cubic-bezier(.4,0,.2,1);
  overflow:hidden;
}
.badge-popup::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--accent));border-radius:18px 18px 0 0;}
.badge-popup-img-wrap{
  width:100%;height:160px;background:linear-gradient(135deg,rgba(155,114,255,.12),rgba(232,70,10,.08));
  display:flex;align-items:center;justify-content:center;font-size:4rem;border-bottom:1px solid var(--border);overflow:hidden;
}
.badge-popup-img-wrap img{width:100%;height:100%;object-fit:contain;padding:1.5rem;}
.badge-popup-body{padding:1.15rem 1.25rem 1.35rem;}
.badge-popup-name{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;margin-bottom:.3rem;}
.badge-popup-desc{font-size:.82rem;color:var(--text2);line-height:1.6;margin-bottom:.75rem;}
.badge-popup-meta{display:flex;flex-direction:column;gap:.28rem;}
.badge-popup-meta-row{display:flex;gap:.5rem;font-size:.72rem;align-items:flex-start;}
.badge-popup-meta-lbl{font-family:'DM Mono',monospace;color:var(--muted);min-width:68px;flex-shrink:0;}
.badge-popup-meta-val{color:var(--text2);word-break:break-all;}
.badge-popup-close{position:absolute;top:.85rem;right:.85rem;background:none;border:none;color:var(--muted);cursor:pointer;font-size:.95rem;padding:.2rem .32rem;border-radius:6px;transition:all .15s;line-height:1;}
.badge-popup-close:hover{background:var(--surface2);color:var(--text);}
.profile-comments-more{background:transparent;border:1px solid var(--border2);border-radius:8px;color:var(--text2);font-size:.68rem;padding:.24rem .48rem;cursor:pointer;align-self:flex-start;}
.profile-comments-more:hover{border-color:var(--accent);color:var(--accent);}
.profile-comment-form{display:flex;align-items:flex-end;gap:.4rem;margin-top:.5rem;}
.profile-comment-input{flex:1;min-height:36px;max-height:90px;background:#0f141b;border:1px solid var(--border2);border-radius:8px;padding:.38rem .52rem;color:var(--text);font-size:.75rem;font-family:'DM Sans',sans-serif;resize:vertical;}
.profile-comment-input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 2px rgba(232,70,10,.18);}
.profile-comment-btn{background:var(--surface3);border:1px solid var(--border2);border-radius:8px;color:var(--text);font-size:.72rem;padding:.33rem .62rem;cursor:pointer;font-weight:600;}
.profile-comment-btn:hover{border-color:var(--accent);color:var(--accent);}
.profile-feed-photo.broken{display:flex;align-items:center;justify-content:center;background:#10151d;}
.profile-feed-photo.broken span{font-size:.7rem;color:var(--text2);font-family:'DM Mono',monospace;}
.profile-feed-empty{font-size:.78rem;color:var(--muted);padding:.75rem;border:1px dashed var(--border2);border-radius:8px;}
.profile-media-card{padding:.72rem;}
.profile-tab-row{display:flex;gap:.34rem;flex-wrap:wrap;padding:.24rem;background:var(--surface2);border:1px solid var(--border);border-radius:10px;margin-bottom:.62rem;}
.profile-tab{flex:1;background:transparent;border:1px solid transparent;border-radius:8px;padding:.38rem .5rem;cursor:pointer;color:var(--text2);font-size:.72rem;font-weight:600;}
.profile-tab.active{background:var(--surface3);border-color:var(--accent);color:var(--text);}
.profile-tab-pane{display:none;}
.profile-tab-pane.on{display:block;}
.profile-media-list{display:flex;flex-direction:column;gap:.58rem;}
.profile-stream-item{display:flex;align-items:center;justify-content:space-between;gap:.6rem;padding:.58rem .62rem;background:var(--surface2);border:1px solid var(--border);border-radius:9px;}
.profile-stream-title{font-size:.8rem;color:var(--text);font-weight:600;line-height:1.4;}
.profile-stream-meta{font-family:'DM Mono',monospace;font-size:.66rem;color:var(--muted);margin-top:.22rem;}
/* Media tab videos: 3-col landscape 16:9 - half the size of old portrait layout */
.profile-video-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.45rem;}
.profile-video-card{background:var(--surface2);border:1px solid var(--border);border-radius:8px;overflow:hidden;}
.profile-video-frame{aspect-ratio:16/9;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;}
.profile-video-frame video{width:100%;height:100%;object-fit:cover;display:block;background:#000;}
.profile-video-fallback{font-size:.68rem;color:var(--text2);padding:.5rem;text-align:center;}
.profile-video-meta{padding:.3rem .4rem;}
.profile-video-caption{font-size:.68rem;color:var(--text2);line-height:1.4;max-height:2.8em;overflow:hidden;}
.profile-video-time{font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);margin-top:.18rem;}
.profile-photo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.5rem;}
.profile-photo-card{position:relative;border-radius:8px;overflow:hidden;border:1px solid var(--border);background:#0b0f14;aspect-ratio:1/1;}
.profile-photo-card img{width:100%;height:100%;object-fit:cover;display:block;}
.profile-photo-cap{position:absolute;left:0;right:0;bottom:0;background:linear-gradient(to top,rgba(0,0,0,.65),rgba(0,0,0,0));color:#d8e1ea;font-size:.62rem;padding:.4rem .38rem .28rem;line-height:1.4;max-height:3em;overflow:hidden;}
/* Profile compose box */
.profile-compose-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:.85rem;}
.profile-compose-box.hidden{display:none;}
.profile-compose-header{display:flex;align-items:center;gap:.55rem;margin-bottom:.6rem;}
.profile-compose-av{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--zap));display:flex;align-items:center;justify-content:center;font-size:1rem;overflow:hidden;flex-shrink:0;border:2px solid var(--border2);}
.profile-compose-label{font-family:'Syne',sans-serif;font-weight:700;font-size:.85rem;}
.profile-compose-textarea{width:100%;min-height:80px;max-height:200px;background:#0a1018;border:1px solid var(--border2);border-radius:10px;padding:.55rem .72rem;color:var(--text);font-family:'DM Sans',sans-serif;font-size:.84rem;outline:none;resize:vertical;line-height:1.5;transition:border-color .15s;}
.profile-compose-textarea:focus{border-color:var(--accent);box-shadow:0 0 0 2px rgba(232,70,10,.15);}
.profile-compose-textarea::placeholder{color:var(--muted);}
.profile-compose-footer{display:flex;align-items:center;justify-content:flex-end;gap:.5rem;margin-top:.5rem;}
.profile-compose-chars{font-family:'DM Mono',monospace;font-size:.66rem;color:var(--muted);margin-right:auto;}
.profile-compose-btn{padding:.38rem .95rem;background:var(--accent);border:none;border-radius:8px;cursor:pointer;color:#fff;font-size:.8rem;font-weight:600;font-family:'DM Sans',sans-serif;transition:all .15s;}
.profile-compose-btn:hover{background:#ff5520;}
.profile-compose-btn:disabled{opacity:.5;cursor:not-allowed;}
.pmeta-row{display:flex;align-items:flex-start;justify-content:space-between;gap:.55rem;font-size:.76rem;color:var(--text2);}
.pmeta-row span:first-child{font-family:'DM Mono',monospace;color:var(--muted);}
.pmeta-row code{font-family:'DM Mono',monospace;color:var(--text);font-size:.68rem;word-break:break-all;}
.pmeta-row a{color:var(--accent);text-decoration:none;word-break:break-all;}

/* ======== INFINITE SCROLL SENTINEL ======== */
.feed-sentinel{
  display:flex;align-items:center;justify-content:center;
  padding:1.1rem .5rem;
}
.feed-sentinel-label{
  font-family:'DM Mono',monospace;font-size:.62rem;
  color:var(--muted);letter-spacing:.06em;
  animation:sentinelPulse 1.5s ease-in-out infinite;
}
.media-sentinel{padding:.85rem .5rem;}
@keyframes sentinelPulse{0%,100%{opacity:.4}50%{opacity:1}}

@media (max-width: 1024px){
  .profile-top{grid-template-columns:1fr;}
  .profile-main-grid{grid-template-columns:1fr;}
  .profile-photo-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
  .profile-inline-stats{grid-template-columns:repeat(2,minmax(0,1fr));}
  .profile-action-box{justify-self:start;margin-top:0;width:100%;}
  .profile-actions-row{justify-content:flex-start;}
  .profile-inline-meta{margin-top:0;}
}
@media (max-width: 860px){
  .profile-video-grid{grid-template-columns:1fr;}
}
@media (max-width: 680px){
  .profile-content{padding:0 1rem 1rem;}
  .profile-head-row{align-items:center;}
  .profile-av-wrap{margin-top:-10px;}
  .profile-av-big{width:100px;height:100px;font-size:2.3rem;}
}

/* ======== MODALS ======== */
.modal-ov{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;background:rgba(5,8,12,.88);backdrop-filter:blur(18px) saturate(.55);}
.modal-ov.open{display:flex;animation:fadeIn .2s ease;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:var(--surface);border:1px solid var(--border2);border-radius:18px;width:min(580px,94vw);max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 40px 120px rgba(0,0,0,.9);animation:slideUp .25s cubic-bezier(.4,0,.2,1);}
@keyframes slideUp{from{transform:translateY(22px);opacity:0}to{transform:translateY(0);opacity:1}}
.modal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),var(--zap));border-radius:18px 18px 0 0;}
.mhd{padding:1.35rem 1.35rem 0;display:flex;align-items:flex-start;justify-content:space-between;}
.mtitle{font-family:'Syne',sans-serif;font-weight:800;font-size:1.08rem;display:flex;align-items:center;gap:.42rem;}
.mi{color:var(--accent);}
.mclose{background:none;border:none;color:var(--muted);cursor:pointer;font-size:1rem;padding:.2rem .32rem;border-radius:6px;transition:all .15s;line-height:1;}
.mclose:hover{background:var(--surface2);color:var(--text);}
.msub{font-size:.77rem;color:var(--muted);padding:.18rem 1.35rem .08rem;}
.mbody{padding:1.05rem 1.35rem;}
.fg-grid{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;}
.fg{display:flex;flex-direction:column;gap:.32rem;}
.fg.full{grid-column:1/-1;}
label{font-size:.67rem;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;font-family:'DM Mono',monospace;}
input,select,textarea{background:var(--surface2);border:1px solid var(--border2);border-radius:9px;padding:.5rem .8rem;color:var(--text);font-family:'DM Sans',sans-serif;font-size:.83rem;outline:none;transition:border-color .18s,box-shadow .18s;width:100%;}
input:focus,select:focus,textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--accent-glow);}
input::placeholder,textarea::placeholder{color:var(--muted);}
select option{background:var(--surface2);}
textarea{resize:vertical;min-height:65px;line-height:1.5;}
.srow{display:flex;gap:.42rem;}
.sc{padding:.3rem .75rem;border-radius:7px;font-size:.76rem;font-weight:500;cursor:pointer;border:1px solid var(--border2);background:transparent;color:var(--muted);transition:all .15s;font-family:'DM Sans',sans-serif;}
.sc.sl{border-color:var(--live);color:var(--live);background:rgba(255,59,92,.1);}
.relay-bar{font-family:'DM Mono',monospace;font-size:.68rem;color:var(--green);background:rgba(0,212,138,.05);border:1px solid rgba(0,212,138,.13);border-radius:8px;padding:.48rem .72rem;margin-top:.18rem;display:flex;align-items:center;gap:.32rem;}
.go-live-manage{margin-bottom:.7rem;display:none;}
.go-live-manage.on{display:block;}
.go-live-manage-help{margin-top:.28rem;font-size:.68rem;color:var(--muted);line-height:1.5;}
.mfooter{padding:.85rem 1.35rem 1.35rem;display:flex;gap:.55rem;justify-content:flex-end;border-top:1px solid var(--border);}
.msuccess{display:none;padding:1.8rem 1.5rem;text-align:center;}
.msuccess.on{display:block;}
.succ-icon{font-size:2.6rem;margin-bottom:.6rem;}
.succ-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.12rem;margin-bottom:.4rem;}
.succ-text{font-size:.82rem;color:var(--text2);line-height:1.6;}

/* Login modal */
.login-modal{background:var(--surface);border:1px solid var(--border2);border-radius:18px;width:min(410px,94vw);position:relative;box-shadow:0 40px 120px rgba(0,0,0,.9);animation:slideUp .25s cubic-bezier(.4,0,.2,1);overflow:hidden;}
.login-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--accent));border-radius:18px 18px 0 0;}
.lm-hd{padding:1.35rem 1.35rem .85rem;text-align:center;}
.lm-logo{font-family:'Syne',sans-serif;font-weight:800;font-size:1.25rem;margin-bottom:.12rem;display:flex;align-items:center;justify-content:center;gap:.38rem;}
.lm-lb{color:var(--zap);}
.lm-sub{font-size:.78rem;color:var(--muted);}
.lm-body{padding:.2rem 1.2rem 1.35rem;}
.lm-sec{font-family:'DM Mono',monospace;font-size:.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.45rem;margin-top:.8rem;}
.lo{display:flex;align-items:center;gap:.82rem;padding:.82rem .95rem;border-radius:12px;cursor:pointer;border:1px solid var(--border2);background:var(--surface2);transition:all .18s;margin-bottom:.45rem;}
.lo:hover{border-color:var(--accent);background:var(--surface3);}
.lo:hover .lo-arr{opacity:1;transform:translateX(0);}
.lo-ico{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0;}
.lo-ico.ext{background:linear-gradient(135deg,rgba(155,114,255,.2),rgba(155,114,255,.05));border:1px solid rgba(155,114,255,.2);}
.lo-ico.hw{background:linear-gradient(135deg,rgba(0,212,138,.15),rgba(0,212,138,.05));border:1px solid rgba(0,212,138,.2);}
.lo-ico.new{background:linear-gradient(135deg,rgba(0,212,138,.2),rgba(0,212,138,.05));border:1px solid rgba(0,212,138,.2);}
.lo-t{font-size:.88rem;font-weight:600;}
.lo-d{font-size:.73rem;color:var(--muted);margin-top:.08rem;line-height:1.4;}
.lo-arr{margin-left:auto;color:var(--muted);font-size:.88rem;opacity:0;transform:translateX(-4px);transition:all .15s;}
.lm-div{display:flex;align-items:center;gap:.7rem;margin:.55rem 0;}
.lm-div span{font-size:.7rem;color:var(--muted);white-space:nowrap;}
.lm-div::before,.lm-div::after{content:'';flex:1;height:1px;background:var(--border);}
.key-wrap{display:flex;flex-direction:column;gap:.42rem;margin-bottom:.45rem;}
.key-inp{font-family:'DM Mono',monospace;font-size:.74rem;}
.key-inp::placeholder{font-family:'DM Mono',monospace;}
.lm-warn{font-size:.71rem;color:var(--muted);display:flex;align-items:flex-start;gap:.38rem;line-height:1.4;background:rgba(232,70,10,.06);border:1px solid rgba(232,70,10,.12);border-radius:7px;padding:.48rem .62rem;margin-top:.12rem;}
.lm-close{position:absolute;top:.95rem;right:.95rem;background:none;border:none;color:var(--muted);cursor:pointer;font-size:.95rem;padding:.2rem .32rem;border-radius:6px;transition:all .15s;line-height:1;}
.lm-close:hover{background:var(--surface2);color:var(--text);}

/* Settings / FAQ modals Ã¢â‚¬â€ legacy (kept for FAQ + onboarding) */
.settings-modal{background:var(--surface);border:1px solid var(--border2);border-radius:18px;width:min(520px,94vw);max-height:85vh;overflow-y:auto;position:relative;box-shadow:0 40px 120px rgba(0,0,0,.9);animation:slideUp .25s cubic-bezier(.4,0,.2,1);}
.settings-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--green));border-radius:18px 18px 0 0;}
.sm-hd{padding:1.35rem 1.35rem .5rem;display:flex;align-items:center;justify-content:space-between;}
.sm-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.08rem;}
.sm-body{padding:.5rem 1.35rem 1.35rem;}
.sm-section{margin-bottom:1.2rem;}
.sm-sec-title{font-family:'DM Mono',monospace;font-size:.68rem;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:.55rem;}
.sm-row{display:flex;align-items:center;justify-content:space-between;padding:.62rem .8rem;border-radius:9px;background:var(--surface2);border:1px solid var(--border);margin-bottom:.38rem;}
.sm-row-label{font-size:.83rem;font-weight:500;}
.sm-row-desc{font-size:.72rem;color:var(--muted);margin-top:.05rem;}
.toggle{width:38px;height:20px;border-radius:10px;background:var(--border2);cursor:pointer;position:relative;transition:background .2s;flex-shrink:0;}
.toggle.on{background:var(--accent);}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;background:#fff;transition:transform .2s;}
.toggle.on::after{transform:translateX(18px);}
.relay-tag{display:inline-flex;align-items:center;gap:.35rem;background:var(--surface3);border:1px solid var(--border2);border-radius:6px;padding:.3rem .6rem;font-family:'DM Mono',monospace;font-size:.72rem;margin:.2rem .2rem 0 0;}
.relay-tag .rem{background:none;border:none;color:var(--muted);cursor:pointer;font-size:.7rem;padding:0;line-height:1;}
.relay-tag .rem:hover{color:var(--live);}
.relay-add-row{display:flex;gap:.5rem;margin-top:.5rem;}
.relay-add-row input{flex:1;font-family:'DM Mono',monospace;font-size:.75rem;}
.sm-save-row{display:flex;justify-content:flex-end;padding-top:.2rem;}
#settingsRelayList{display:flex;flex-wrap:wrap;}
#settingsRelayList .relay-tag{margin-bottom:.35rem;}

/* ======== SETTINGS MODAL V2 ======== */
.settings-modal-v2{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:18px;width:min(680px,96vw);max-height:88vh;
  position:relative;box-shadow:0 40px 120px rgba(0,0,0,.9);
  animation:slideUp .25s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column;overflow:hidden;
}
.settings-modal-v2::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--purple),var(--accent),var(--zap));
  border-radius:18px 18px 0 0;z-index:1;
}
.smv2-hd{
  padding:1.2rem 1.35rem .9rem;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--border);flex-shrink:0;
}
.smv2-title{font-family:'Syne',sans-serif;font-weight:800;font-size:1.1rem;display:flex;align-items:center;gap:.5rem;}
.smv2-tabs{
  display:flex;gap:.25rem;padding:.65rem 1.1rem .55rem;
  border-bottom:1px solid var(--border);flex-shrink:0;background:var(--surface);
}
.smv2-tab{
  display:flex;align-items:center;gap:.42rem;padding:.46rem 1rem;border-radius:9px;
  font-size:.8rem;font-weight:600;font-family:'DM Sans',sans-serif;
  cursor:pointer;border:1px solid transparent;color:var(--text2);background:transparent;
  transition:all .15s;white-space:nowrap;
}
.smv2-tab:hover{background:var(--surface2);color:var(--text);}
.smv2-tab.active{background:var(--surface2);border-color:var(--border2);color:var(--text);}
.smv2-tab.active.tab-profile{border-color:rgba(155,114,255,.35);color:var(--purple);}
.smv2-tab.active.tab-relays{border-color:rgba(0,212,138,.35);color:var(--green);}
.smv2-tab.active.tab-app{border-color:rgba(232,70,10,.35);color:var(--accent);}
.smv2-panel{display:none;padding:1.2rem 1.35rem 1.4rem;overflow-y:auto;flex:1;}
.smv2-panel.active{display:block;}
.smv2-panel-label{
  font-family:'DM Mono',monospace;font-size:.65rem;color:var(--muted);
  background:var(--surface2);border:1px solid var(--border);border-radius:7px;
  padding:.38rem .72rem;margin-bottom:1.1rem;display:flex;align-items:center;gap:.4rem;
}
.smv2-avatar-row{display:flex;align-items:flex-start;gap:1rem;margin-bottom:.95rem;}
.smv2-avatar-preview{
  width:80px;height:80px;border-radius:50%;
  background:linear-gradient(135deg,var(--accent),var(--zap));
  border:2px solid var(--border2);overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  font-size:1.7rem;color:#fff;font-family:'Syne',sans-serif;font-weight:800;
  flex-shrink:0;transition:border-color .2s;
}
.smv2-avatar-preview img{width:100%;height:100%;object-fit:cover;display:block;}
.smv2-avatar-fields{flex:1;display:flex;flex-direction:column;gap:.55rem;}
.smv2-field-row{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;margin-top:.65rem;}
.smv2-field-hint{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);margin-top:.22rem;}
.smv2-save-row{display:flex;justify-content:flex-end;padding-top:1rem;margin-top:.5rem;border-top:1px solid var(--border);}
.smv2-section{margin-bottom:1.25rem;}
.smv2-section-title{
  font-family:'DM Mono',monospace;font-size:.66rem;text-transform:uppercase;
  letter-spacing:.1em;color:var(--muted);margin-bottom:.55rem;
  padding-bottom:.35rem;border-bottom:1px solid var(--border);
}
#settingsRelayList2{display:flex;flex-wrap:wrap;margin-bottom:.2rem;}
#settingsRelayList2 .relay-tag{margin-bottom:.38rem;}

/* ======== ALL BADGES POPUP ======== */
.all-badges-popup-ov{
  position:fixed;inset:0;z-index:2100;display:none;align-items:center;justify-content:center;
  background:rgba(5,8,12,.87);backdrop-filter:blur(16px) saturate(.55);
}
.all-badges-popup-ov.open{display:flex;animation:fadeIn .18s ease;}
.all-badges-popup{
  background:var(--surface);border:1px solid var(--border2);border-radius:18px;
  width:min(480px,94vw);max-height:80vh;position:relative;
  box-shadow:0 40px 120px rgba(0,0,0,.9);animation:slideUp .22s cubic-bezier(.4,0,.2,1);
  display:flex;flex-direction:column;overflow:hidden;
}
.all-badges-popup::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--purple),var(--accent));border-radius:18px 18px 0 0;}
.abp-hd{padding:1rem 1.2rem .8rem;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);flex-shrink:0;}
.abp-title{font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;display:flex;align-items:center;gap:.4rem;}
.abp-body{padding:1rem 1.2rem 1.2rem;overflow-y:auto;}
.abp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.55rem;}
.badge-see-more{
  display:flex;align-items:center;justify-content:center;
  width:42px;height:42px;border-radius:8px;
  background:rgba(155,114,255,.1);border:1px dashed rgba(155,114,255,.4);
  font-size:.62rem;font-family:'DM Mono',monospace;color:var(--purple);
  cursor:pointer;transition:all .15s;text-align:center;line-height:1.2;
}
.badge-see-more:hover{background:rgba(155,114,255,.2);border-color:rgba(155,114,255,.7);box-shadow:0 0 10px rgba(155,114,255,.3);}

/* ======== POST BOOST/REPOST BANNER ======== */
.pf-boost-banner{
  display:flex;align-items:center;gap:.4rem;font-size:.72rem;color:var(--text2);
  padding:.38rem .75rem .28rem;background:rgba(155,114,255,.06);
  border-bottom:1px solid rgba(155,114,255,.12);border-radius:10px 10px 0 0;margin:-1px -1px .6rem;
}
.pf-boost-icon{font-size:.8rem;}
.pf-boost-label{font-family:'DM Mono',monospace;font-size:.65rem;color:var(--purple);}
.profile-feed-item:has(.pf-boost-banner){border-color:rgba(155,114,255,.22);}

/* ======== NIP-05 VERIFIED = PURPLE GLOWING SQUARE ======== */
.nav-avatar.nip05-square{
  border-radius:8px;border:2px solid rgba(155,114,255,.7);
  box-shadow:0 0 10px rgba(155,114,255,.55),0 0 22px rgba(155,114,255,.25),inset 0 0 8px rgba(155,114,255,.1);
  animation:nip05Pulse 2.8s ease-in-out infinite;
}
.pd-av-lg.nip05-square{
  border-radius:8px;border:2px solid rgba(155,114,255,.7);
  box-shadow:0 0 10px rgba(155,114,255,.55),0 0 22px rgba(155,114,255,.25);
  animation:nip05Pulse 2.8s ease-in-out infinite;
}
.profile-feed-av.nip05-square{
  border-radius:7px;border:1.5px solid rgba(155,114,255,.7);
  box-shadow:0 0 8px rgba(155,114,255,.5),0 0 16px rgba(155,114,255,.2);
  animation:nip05Pulse 2.8s ease-in-out infinite;
}
.profile-comment-av.nip05-square{
  border-radius:6px;border:1.5px solid rgba(155,114,255,.7);
  box-shadow:0 0 7px rgba(155,114,255,.5),0 0 14px rgba(155,114,255,.2);
  animation:nip05Pulse 2.8s ease-in-out infinite;
}
.sib-av.nip05-square{
  border-radius:9px;border:2px solid rgba(155,114,255,.7);
  box-shadow:0 0 10px rgba(155,114,255,.55),0 0 20px rgba(155,114,255,.25);
  animation:nip05Pulse 2.8s ease-in-out infinite;
}

body.hide-nip05 .nip05-badge,
body.hide-nip05 .c-nip05{display:none!important;}
body.hide-zap-notices .zap-ev{display:none!important;}
body.compact-chat .cmsg{padding:.38rem .46rem;}
body.no-chat-anim .cmsg{animation:none!important;}
.faq-item{border:1px solid var(--border);border-radius:9px;overflow:hidden;margin-bottom:.4rem;}
.faq-q{display:flex;align-items:center;justify-content:space-between;padding:.7rem .85rem;cursor:pointer;font-size:.83rem;font-weight:500;transition:background .12s;}
.faq-q:hover{background:var(--surface2);}
.faq-chevron{transition:transform .2s;color:var(--muted);font-size:.75rem;}
.faq-a{font-size:.79rem;color:var(--text2);line-height:1.6;padding:0 .85rem;max-height:0;overflow:hidden;transition:max-height .25s ease,padding .25s;}
.faq-item.open .faq-a{max-height:200px;padding:.1rem .85rem .75rem;}
.faq-item.open .faq-chevron{transform:rotate(180deg);}

/* End confirm */
.end-confirm-modal{background:var(--surface);border:1px solid rgba(255,59,92,.3);border-radius:16px;width:min(340px,94vw);padding:1.5rem;text-align:center;animation:slideUp .2s ease;position:relative;}
.end-confirm-modal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--live);border-radius:16px 16px 0 0;}
.share-modal{width:min(520px,94vw);}
.share-modal-body{padding:.95rem 1rem 1rem;display:flex;flex-direction:column;gap:.75rem;}
.share-field{display:flex;flex-direction:column;gap:.28rem;}
.share-field label{font-family:'DM Mono',monospace;font-size:.64rem;color:var(--muted);letter-spacing:.08em;text-transform:uppercase;}
.share-copy-row{display:flex;gap:.45rem;}
.share-copy-row input{flex:1;background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:.42rem .55rem;color:var(--text);font-size:.74rem;font-family:'DM Mono',monospace;outline:none;}
.share-copy-row input:focus{border-color:var(--accent);}
.share-choice-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.45rem;}
.share-choice-btn{background:var(--surface2);border:1px solid var(--border2);border-radius:10px;padding:.58rem .42rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:.24rem;color:var(--text);font-size:.72rem;font-weight:600;}
.share-choice-btn:hover{border-color:var(--accent);}
.share-choice-btn .sub{font-size:.62rem;color:var(--text2);font-weight:400;}
.reaction-picker-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:.4rem;}
.reaction-opt-btn{background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:.45rem .2rem;cursor:pointer;color:var(--text);font-size:.88rem;display:flex;align-items:center;justify-content:center;min-height:34px;}
.reaction-opt-btn img{width:18px;height:18px;object-fit:contain;display:block;}
.reaction-opt-btn:hover{border-color:var(--accent);}
.reaction-custom-row{display:flex;flex-direction:column;gap:.42rem;}
.reaction-custom-row input{background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:.42rem .55rem;color:var(--text);font-size:.74rem;font-family:'DM Mono',monospace;outline:none;}
.reaction-custom-row input:focus{border-color:var(--accent);}
.reaction-picker-foot{display:flex;justify-content:flex-end;gap:.5rem;}

/* ======== ONBOARDING MODAL ======== */
.onboard-modal{width:min(580px,96vw);max-height:92vh;overflow-y:auto;padding:1.4rem 1.5rem 1.5rem;}
.onboard-step{display:none;}
.onboard-step.active{display:block;}

/* Step progress bar */
.onboard-steps-bar{display:flex;align-items:center;gap:0;margin-bottom:1.3rem;}
.onboard-step-dot{
  width:28px;height:28px;border-radius:50%;flex-shrink:0;
  background:var(--surface3);border:2px solid var(--border2);
  display:flex;align-items:center;justify-content:center;
  font-size:.7rem;font-weight:700;color:var(--muted);
  font-family:'DM Mono',monospace;transition:all .25s;
}
.onboard-step-dot::after{content:attr(data-n);}
.onboard-step-dot.active{background:var(--green);border-color:var(--green);color:#000;}
.onboard-step-dot.done{background:rgba(0,212,138,.2);border-color:var(--green);color:var(--green);}
.onboard-step-line{flex:1;height:2px;background:var(--border2);margin:0 .5rem;transition:background .25s;}
.onboard-step-line.done{background:var(--green);}

/* Key hero block */
.onboard-key-hero{
  background:linear-gradient(135deg,rgba(0,212,138,.05),rgba(155,114,255,.03));
  border:1px solid rgba(0,212,138,.18);
  border-radius:12px;padding:1rem 1rem .9rem;margin-bottom:1rem;
}
.onboard-key-label{
  font-family:'DM Mono',monospace;font-size:.61rem;text-transform:uppercase;
  letter-spacing:.12em;color:var(--green);margin-bottom:.55rem;
  display:flex;align-items:center;gap:.4rem;
}
.onboard-key-label::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--green);flex-shrink:0;}
.onboard-nsec-row{
  display:flex;align-items:center;gap:.55rem;
  background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.07);
  border-radius:9px;padding:.55rem .7rem;
}
.onboard-nsec-text{
  flex:1;font-family:'DM Mono',monospace;font-size:.72rem;
  color:var(--text);word-break:break-all;line-height:1.5;
  filter:blur(5px);transition:filter .3s;user-select:all;cursor:pointer;
}
.onboard-nsec-text.revealed{filter:none;}
.onboard-nsec-actions{display:flex;flex-direction:column;gap:.35rem;flex-shrink:0;}
.onboard-reveal-btn,.onboard-copy-btn{
  padding:.28rem .65rem;border-radius:7px;font-size:.7rem;font-weight:600;
  cursor:pointer;font-family:'DM Sans',sans-serif;white-space:nowrap;
  transition:all .15s;border:1px solid rgba(0,212,138,.3);color:var(--green);
}
.onboard-reveal-btn{background:transparent;}
.onboard-reveal-btn:hover{background:rgba(0,212,138,.1);}
.onboard-copy-btn{background:rgba(0,212,138,.1);}
.onboard-copy-btn:hover{background:rgba(0,212,138,.22);}
.onboard-copy-btn.copied{background:rgba(0,212,138,.25);border-color:var(--green);color:#00e89a;}

.onboard-warn-box{
  background:rgba(232,70,10,.05);border:1px solid rgba(232,70,10,.16);
  border-radius:8px;padding:.6rem .75rem;margin-top:.8rem;
  font-size:.76rem;color:var(--text2);line-height:1.55;
}
.onboard-warn-box strong{color:#ff7c5c;}

.onboard-confirm-row{
  display:flex;align-items:flex-start;gap:.6rem;margin-top:.9rem;
  padding:.65rem .75rem;border-radius:9px;
  border:1px solid var(--border);background:var(--surface2);
  cursor:pointer;transition:border-color .2s;
}
.onboard-confirm-row:has(.onboard-checkbox:checked){border-color:var(--green);background:rgba(0,212,138,.04);}
.onboard-checkbox{
  width:15px;height:15px;flex-shrink:0;margin-top:.15rem;
  accent-color:var(--green);cursor:pointer;
}
.onboard-confirm-label{font-size:.79rem;color:var(--text2);line-height:1.5;cursor:pointer;user-select:none;}

.onboard-continue-btn{
  width:100%;margin-top:.9rem;padding:.65rem 1rem;border-radius:9px;
  font-size:.84rem;font-weight:700;font-family:'Syne',sans-serif;letter-spacing:.01em;
  background:var(--green);color:#000;border:none;cursor:pointer;
  transition:all .2s;opacity:.35;pointer-events:none;
}
.onboard-continue-btn.ready{opacity:1;pointer-events:all;}
.onboard-continue-btn.ready:hover{background:#00e89a;box-shadow:0 0 22px rgba(0,212,138,.4);}

/* Profile step */
.onboard-avatar-preview-row{display:flex;align-items:flex-start;gap:.9rem;margin-bottom:.9rem;}
.onboard-avatar-circle{
  width:72px;height:72px;border-radius:50%;flex-shrink:0;
  background:linear-gradient(135deg,var(--accent),var(--zap));
  border:2px solid var(--border2);overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  font-size:1.5rem;color:#fff;font-family:'Syne',sans-serif;font-weight:800;
  transition:border-color .2s;
}
.onboard-avatar-circle img{width:100%;height:100%;object-fit:cover;display:block;}
.onboard-avatar-fields{flex:1;display:flex;flex-direction:column;gap:.5rem;}
.onboard-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:.3rem;}
.onboard-form-grid .fg.full{grid-column:1/-1;}
.onboard-field-hint{font-size:.63rem;color:var(--muted);margin-top:.18rem;font-family:'DM Mono',monospace;}
.onboard-footer-row{
  display:flex;gap:.5rem;justify-content:flex-end;align-items:center;
  padding-top:1rem;border-top:1px solid var(--border);margin-top:1rem;
}
.onboard-footer-row .btn-ghost:first-child{margin-right:auto;}
.sec-hd-left{display:flex;align-items:center;gap:.55rem;flex:1;min-width:0;}
.list-filter-wrap{position:relative;flex-shrink:0;}
.list-filter-btn{
  display:inline-flex;align-items:center;gap:.38rem;
  padding:.26rem .6rem .26rem .72rem;
  border-radius:8px;border:1px solid var(--border2);
  background:var(--surface2);color:var(--text2);
  font-size:.74rem;font-weight:600;cursor:pointer;
  font-family:'DM Sans',sans-serif;
  transition:all .15s;white-space:nowrap;max-width:180px;
}
.list-filter-btn:hover{border-color:var(--accent);color:var(--text);}
.list-filter-btn.open{border-color:var(--purple);color:var(--purple);background:rgba(155,114,255,.06);}
.list-filter-btn-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:120px;}
.list-filter-caret{flex-shrink:0;font-size:.6rem;opacity:.7;transition:transform .2s;}
.list-filter-btn.open .list-filter-caret{transform:rotate(180deg);}
.list-filter-dd{
  position:absolute;top:calc(100% + 5px);left:0;
  min-width:220px;max-width:300px;
  background:var(--surface);border:1px solid var(--border2);
  border-radius:12px;padding:.45rem;
  box-shadow:0 20px 60px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.03);
  z-index:400;opacity:0;pointer-events:none;
  transform:translateY(-5px);transition:opacity .15s,transform .15s;
}
.list-filter-dd.open{opacity:1;pointer-events:all;transform:translateY(0);}
.lf-section-label{
  font-family:'DM Mono',monospace;font-size:.6rem;
  text-transform:uppercase;letter-spacing:.1em;
  color:var(--muted);padding:.18rem .6rem .28rem;display:block;
}
.lf-item{
  display:flex;align-items:center;gap:.6rem;
  padding:.46rem .65rem;border-radius:8px;
  font-size:.8rem;color:var(--text2);cursor:pointer;
  transition:background .1s;border:none;background:none;
  width:100%;text-align:left;font-family:'DM Sans',sans-serif;
}
.lf-item:hover{background:var(--surface2);color:var(--text);}
.lf-item.active{color:var(--purple);background:rgba(155,114,255,.08);}
.lf-item.active .lf-dot{background:var(--purple);}
.lf-dot{width:7px;height:7px;border-radius:50%;background:var(--border2);flex-shrink:0;transition:background .15s;}
.lf-item-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.lf-item-count{font-family:'DM Mono',monospace;font-size:.65rem;color:var(--muted);flex-shrink:0;}
.lf-sep{height:1px;background:var(--border);margin:.3rem 0;}

/* Add list row */
.lf-add-row{display:flex;align-items:center;gap:.4rem;padding:.32rem .45rem;}
.lf-add-input{
  flex:1;background:var(--surface2);border:1px solid var(--border2);
  border-radius:7px;padding:.3rem .55rem;color:var(--text);
  font-family:'DM Mono',monospace;font-size:.7rem;outline:none;
}
.lf-add-input:focus{border-color:var(--purple);}
.lf-add-input::placeholder{color:var(--muted);}
.lf-add-btn{
  flex-shrink:0;padding:.3rem .55rem;border-radius:7px;
  background:var(--surface3);border:1px solid var(--border2);
  color:var(--text2);font-size:.72rem;font-weight:600;cursor:pointer;
  font-family:'DM Sans',sans-serif;transition:all .12s;white-space:nowrap;
}
.lf-add-btn:hover{border-color:var(--purple);color:var(--purple);}
.lf-add-hint{font-family:'DM Mono',monospace;font-size:.62rem;color:var(--muted);padding:.1rem .65rem .35rem;line-height:1.4;}

/* Following grid empty state */
.following-empty{
  grid-column:1/-1;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:2rem 1rem;gap:.65rem;text-align:center;
  border:1px dashed var(--border2);border-radius:10px;
}
.following-empty-icon{font-size:2rem;opacity:.4;}
.following-empty-title{font-size:.85rem;font-weight:600;color:var(--text2);}
.following-empty-sub{font-size:.75rem;color:var(--muted);line-height:1.55;max-width:300px;}
.following-loading{
  grid-column:1/-1;
  display:flex;align-items:center;justify-content:center;gap:.5rem;
  padding:1.5rem;color:var(--muted);font-size:.8rem;font-family:'DM Mono',monospace;
}
.lf-spinner{
  width:14px;height:14px;border-radius:50%;
  border:2px solid var(--border2);border-top-color:var(--purple);
  animation:spin .7s linear infinite;flex-shrink:0;
}
@keyframes spin{to{transform:rotate(360deg)}}

/* Nip51 tag chip on stream cards in following grid */
.ci-nip51-badge{
  display:inline-flex;align-items:center;gap:.25rem;
  font-family:'DM Mono',monospace;font-size:.6rem;
  color:var(--purple);background:rgba(155,114,255,.1);
  border:1px solid rgba(155,114,255,.2);border-radius:3px;
  padding:.08rem .32rem;
}

/* footer */
footer{padding:1rem 1.2rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--surface);}
footer .flogo{font-family:'Syne',sans-serif;font-weight:800;font-size:.95rem;display:flex;align-items:center;gap:.32rem;}
footer p{font-size:.72rem;color:var(--muted);}
.nostr-pill{font-family:'DM Mono',monospace;font-size:.66rem;color:var(--purple);background:rgba(155,114,255,.1);border:1px solid rgba(155,114,255,.2);border-radius:4px;padding:.17rem .48rem;}

/* ======== HERO FEATURED STREAM ======== */
/* Sci-fi transition overlay */
.hero-transition-ov{
  position:absolute;inset:0;z-index:30;pointer-events:none;
  display:none;
}
.hero-transition-ov.active{display:block;}

/* Scanline sweep effect */
@keyframes scanSweep{
  0%{transform:translateY(-100%);opacity:0;}
  15%{opacity:1;}
  85%{opacity:1;}
  100%{transform:translateY(100%);opacity:0;}
}
.hero-scan-line{
  position:absolute;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(232,70,10,.9),rgba(247,183,49,.7),rgba(232,70,10,.9),transparent);
  box-shadow:0 0 18px 4px rgba(232,70,10,.55),0 0 60px 12px rgba(232,70,10,.2);
  transform:translateY(-100%);
  animation:scanSweep 0.7s cubic-bezier(.4,0,.2,1) forwards;
}

/* Glitch slice layers */
@keyframes glitchSlice{
  0%{clip-path:inset(0 0 95% 0);transform:translateX(-8px);opacity:0;}
  10%{opacity:1;}
  30%{clip-path:inset(20% 0 60% 0);transform:translateX(6px);}
  50%{clip-path:inset(55% 0 20% 0);transform:translateX(-4px);}
  70%{clip-path:inset(80% 0 5% 0);transform:translateX(3px);}
  100%{clip-path:inset(0 0 100% 0);transform:translateX(0);opacity:0;}
}
.hero-glitch-a,.hero-glitch-b{
  position:absolute;inset:0;
  background:inherit;
  opacity:0;
}
.hero-glitch-a{
  animation:glitchSlice 0.65s steps(1) forwards;
  filter:hue-rotate(-40deg) saturate(2);
  mix-blend-mode:screen;
}
.hero-glitch-b{
  animation:glitchSlice 0.65s steps(1) 0.04s reverse forwards;
  filter:hue-rotate(80deg) saturate(1.8);
  mix-blend-mode:screen;
}

/* Grid flash */
@keyframes gridFlash{
  0%,100%{opacity:0;}
  20%,40%,60%{opacity:.18;}
  30%,50%{opacity:.05;}
}
.hero-grid-flash{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(232,70,10,.45) 1px,transparent 1px),
    linear-gradient(90deg,rgba(232,70,10,.45) 1px,transparent 1px);
  background-size:32px 32px;
  animation:gridFlash 0.7s ease forwards;
}

/* Data stream particles */
@keyframes dataRain{
  0%{transform:translateY(-10px);opacity:.9;}
  100%{transform:translateY(460px);opacity:0;}
}
.hero-data-particle{
  position:absolute;top:0;width:1px;
  background:linear-gradient(to bottom,rgba(232,70,10,.9),rgba(247,183,49,.4),transparent);
  border-radius:2px;
  animation:dataRain 0.6s linear forwards;
}

/* Static noise flicker */
@keyframes staticFlicker{
  0%,100%{opacity:0;}
  10%{opacity:.15;}
  20%{opacity:0;}
  30%{opacity:.1;}
  50%{opacity:.08;}
  70%{opacity:.12;}
  90%{opacity:0;}
}
.hero-static{
  position:absolute;inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size:180px 180px;
  mix-blend-mode:overlay;
  animation:staticFlicker 0.7s steps(3) forwards;
}

/* Hero nav controls */
.hero-nav-btn{
  position:absolute;top:50%;transform:translateY(-50%);
  z-index:20;width:40px;height:40px;border-radius:50%;
  background:rgba(8,11,15,.7);backdrop-filter:blur(10px);
  border:1px solid rgba(232,70,10,.3);color:rgba(255,255,255,.8);
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:1.1rem;font-weight:300;
  transition:all .2s;box-shadow:0 0 0 0 rgba(232,70,10,0);
  line-height:1;font-family:system-ui,sans-serif;
}
.hero-nav-btn:hover{
  background:rgba(232,70,10,.8);border-color:var(--accent);
  color:#fff;transform:translateY(-50%) scale(1.1);
  box-shadow:0 0 20px rgba(232,70,10,.4),0 0 0 1px rgba(232,70,10,.5);
}
.hero-nav-prev{left:.85rem;}
.hero-nav-next{right:.85rem;}

/* Dot indicators */
.hero-indicators{
  position:absolute;bottom:12px;left:50%;transform:translateX(-50%);
  display:flex;align-items:center;gap:5px;z-index:20;
}
.hero-dot{
  width:6px;height:6px;border-radius:50%;
  background:rgba(255,255,255,.22);cursor:pointer;
  transition:all .3s cubic-bezier(.4,0,.2,1);
  border:none;padding:0;
}
.hero-dot.active{
  width:22px;border-radius:3px;
  background:var(--accent);
  box-shadow:0 0 8px rgba(232,70,10,.6);
}

/* Cycle progress bar */
.hero-cycle-bar-wrap{
  position:absolute;bottom:0;left:0;right:0;z-index:20;
  height:2px;background:rgba(255,255,255,.06);
}
.hero-cycle-bar-fill{
  height:100%;width:0%;
  background:linear-gradient(90deg,var(--accent),var(--zap));
  box-shadow:0 0 8px rgba(232,70,10,.5);
  transition:width linear;
}

/* Hero player inner */
.hero-player{position:absolute;left:4%;top:50%;transform:translateY(-50%);width:54%;aspect-ratio:16/9;border-radius:12px;overflow:hidden;background:#000;border:1px solid rgba(255,255,255,.07);box-shadow:0 24px 80px rgba(0,0,0,.8);z-index:5;}
.hero-player video{width:100%;height:100%;object-fit:cover;display:block;}
.hero-player-bg{width:100%;height:100%;background:linear-gradient(135deg,#0d1e30,#1a0a00,#080d18);}

/* Stream card thumbnails */
.ct-thumb{width:100%;height:100%;object-fit:cover;display:block;}
.ct-thumb-wrap{position:relative;width:100%;height:100%;background:#0a0f18;overflow:hidden;}

/* ======== NIP-21 MENTION PILLS (nostr:npub/nprofile) ======== */
.nostr-mention-pill {
  display:inline;
  color:var(--purple);
  background:rgba(155,114,255,.1);
  border-radius:4px;
  padding:.05em .28em;
  font-weight:600;
  font-size:.9em;
  cursor:pointer;
  transition:background .15s;
}
.nostr-mention-pill:hover { background:rgba(155,114,255,.22); text-decoration:underline; }

/* ======== NEVENT EMBEDDED NOTE CARDS (nostr:nevent/note) ======== */
.nevent-embed-card {
  display:block;
  margin:.5rem 0;
  border:1px solid var(--border2);
  border-radius:10px;
  padding:.6rem .85rem;
  background:var(--surface2);
  cursor:pointer;
  font-size:.8rem;
  color:var(--muted);
  transition:border-color .15s, background .15s;
}
.nevent-embed-card:hover { border-color:var(--purple); background:var(--surface3); }
.nevent-embed-header {
  display:flex;
  align-items:center;
  gap:.45rem;
  margin-bottom:.32rem;
}
.nevent-embed-av {
  width:20px;height:20px;border-radius:50%;
  overflow:hidden;flex-shrink:0;
  background:var(--surface3);
  display:flex;align-items:center;justify-content:center;
  font-size:.6rem;border:1px solid var(--border);
}
.nevent-embed-av img{width:100%;height:100%;object-fit:cover;}
.nevent-embed-name {
  font-size:.76rem;font-weight:600;color:var(--text);
}
.nevent-embed-name:hover { text-decoration:underline; }
.nevent-embed-time {
  margin-left:auto;
  font-size:.65rem;color:var(--muted);
  font-family:'DM Mono',monospace;
}
.nevent-embed-body {
  font-size:.77rem;color:var(--text2);line-height:1.5;
  display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;
  overflow:hidden;
}
</style>
<link rel="stylesheet" href="./communities/communities.css">
</head>
<body>

<!-- ========= NAV ========= -->
<nav>
  <!-- Logo (left) -->
  <div class="logo-wrap">
    <button class="logo" id="logoBtn"><img src="logo.png" alt="Sifaka Live" class="nav-logo-img"> Sifaka Live</button>
    <div class="nav-dropdown" id="logoDropdown">
      <button class="dd-item" onclick="showPage('home');closeAllDD()"><span class="ddi">Ã°Å¸â€Â´</span>Live Now <span class="dd-count">24</span></button>
      <button class="dd-item" onclick="showCommunities();closeAllDD()"><span class="ddi">&#127970;</span>Communities</button>
      <button class="dd-item" onclick="closeAllDD()"><span class="ddi">Ã°Å¸Å½Â¥</span>Videos</button>
      <button class="dd-item" onclick="closeAllDD()"><span class="ddi">Ã°Å¸â€œÂ¡</span>Nostr Feed</button>
      <button class="dd-item" onclick="closeAllDD()"><span class="ddi">Ã°Å¸â€™Â¬</span>Messages</button>
      <button class="dd-item" onclick="closeAllDD()"><span class="ddi">Ã°Å¸â€â€”</span>Relays</button>
      <div class="dd-sep"></div>
      <button class="dd-item" onclick="openFaq();closeAllDD()"><span class="ddi">Ã¢Ââ€œ</span>FAQ & Help</button>
    </div>
  </div>

  <!-- Search (grows to fill space) -->
  <div class="search-wrap">
    <span class="search-icon"></span>
    <input class="search-input" type="text" placeholder="Search streams, npubs, posts, videos..." oninput="handleSearch(this)">
    <div class="search-results" id="searchResults">
      <span class="sr-label">Live Streams</span>
      <div class="sr-item" onclick="showVideoPage()"><div class="sr-av"></div><div><div class="sr-title">Indie Jazz Live Set</div><div class="sr-sub">wavesound</div></div><span class="sr-live">LIVE</span></div>
      <div class="sr-item"><div class="sr-av"></div><div><div class="sr-title">Building P2P Relay in Rust</div><div class="sr-sub">fiatjaf</div></div><span class="sr-live">LIVE</span></div>
      <div class="dd-sep"></div>
      <span class="sr-label">Profiles</span>
      <div class="sr-item" onclick="showProfile('fiatjaf','','npub1zl3...gz4','fiatjaf@nostr.com');document.getElementById('searchResults').classList.remove('open')"><div class="sr-av"></div><div><div class="sr-title">fiatjaf</div><div class="sr-sub">fiatjaf@nostr.com</div></div></div>
      <div class="sr-item" onclick="showProfile('wavesound','','npub1abc...xyz','wave@bitcoin-cats.ca');document.getElementById('searchResults').classList.remove('open')"><div class="sr-av"></div><div><div class="sr-title">wavesound</div><div class="sr-sub">wave@bitcoin-cats.ca</div></div></div>
      <div class="dd-sep"></div>
      <span class="sr-label">Text Posts</span>
      <div class="sr-item"><div class="sr-av rect" style="background:var(--surface3)"></div><div><div class="sr-title">"just set up my own RTMP server..."</div><div class="sr-sub">nostrdev - 2h ago</div></div></div>
    </div>
  </div>

  <!-- Go Live / Live button -->
  <button class="btn btn-ghost" id="goLiveBtn" onclick="openGoLive()">Go Live</button>

  <!-- Spacer pushes profile pill to far right -->
  <div class="nav-spacer"></div>

  <!-- Logged OUT -->
  <div class="nav-logged-out" id="navLoggedOut">
    <button class="btn btn-primary" onclick="openLogin()">Login with Nostr</button>
  </div>

  <!-- Logged IN - profile pill pinned to far right -->
  <div class="nav-logged-in" id="navLoggedIn">
    <div class="nav-profile">
      <div class="nav-user-pill" id="navUserPill">
        <div class="nav-avatar" id="navAvatar"></div>
        <div class="nav-display-name" id="navDisplayName">wavesound</div>
        <span class="nip05-badge" id="navNip05Badge" style="display:none"></span>
      </div>
      <div class="nav-dropdown" id="profileDropdown">
        <div class="pd-header">
          <div class="pd-av-lg" id="pdAvLg"></div>
          <div>
            <div class="pd-name" id="pdName">wavesound <span class="nip05-badge" id="pdBadge" style="display:none"></span></div>
            <div class="pd-sub" id="pdSub" style="color:var(--nip05)">wave@bitcoin-cats.ca</div>
          </div>
        </div>
        <button class="pd-item" onclick="openMyProfile();closeAllDD()">Ã°Å¸â€˜Â¤ My Profile</button>
        <button class="pd-item" onclick="closeAllDD()">Ã°Å¸â€œÂº My Streams</button>
        <button class="pd-item" onclick="openSettings();closeAllDD()">Ã¢Å¡â„¢Ã¯Â¸Â Settings</button>
        <div class="dd-sep"></div>
        <button class="pd-item pd-signout" onclick="signOut();closeAllDD()">Sign Out</button>
      </div>
    </div>
  </div>
</nav>

<!-- ========= GO LIVE MODAL ========= -->
<div class="modal-ov" id="goLiveModal">
  <div class="modal">
    <div id="mForm">
      <div class="mhd"><div class="mtitle" id="goLiveModalTitle"><span class="mi"></span>Publish Your Stream</div><button class="mclose" onclick="closeGoLive()">x</button></div>
      <div class="msub" id="goLiveModalSub">Broadcasts a <span style="color:var(--purple);font-family:'DM Mono',monospace">kind:30311</span> NIP-53 event to your relays.</div>
      <div class="mbody">
        <div class="go-live-manage" id="goLiveManageWrap">
          <div class="fg">
            <label>Your Streams</label>
            <select id="goLiveStreamSelect" onchange="selectGoLiveStream(this.value)"></select>
            <div class="go-live-manage-help" id="goLiveManageHint">Select a stream to edit, then save updates.</div>
          </div>
        </div>
        <div class="fg-grid">
          <div class="fg"><label>Stream ID (d-tag)</label><input id="goLiveDTag" type="text" value=""></div>
          <div class="fg"><label>Title</label><input id="goLiveTitle" type="text" value="Late Night Nostr Build Session"></div>
          <div class="fg full"><label>Event ID</label><input id="goLiveEventId" type="text" value="" readonly placeholder="Will appear after first publish"></div>
          <div class="fg full"><label>Summary</label><textarea id="goLiveSummary">Building a Nostr client from scratch - open Q&amp;A, come hang out!</textarea></div>
          <div class="fg full"><label>Streaming URL (HLS .m3u8 or RTMP)</label><input id="goLiveStreamUrl" type="text" placeholder="https://your-server.com/live/stream.m3u8"></div>
          <div class="fg full"><label>Thumbnail Image URL</label><input id="goLiveThumb" type="text" placeholder="https://your-server.com/thumb.jpg"></div>
          <div class="fg"><label>Starts (UTC)</label><input id="goLiveStarts" type="datetime-local" value="2026-02-27T20:00"></div>
          <div class="fg"><label>Status</label><div class="srow"><button class="sc sl">Live</button><button class="sc">Planned</button><button class="sc">Ended</button></div></div>
        </div>
        <div class="relay-bar" id="relayBar">Broadcasting to 4 relays: damus.io - nos.lol - snort.social - nostr.wine</div>
      </div>
      <div class="mfooter">
        <button class="btn btn-ghost" onclick="closeGoLive()">Cancel</button>
        <button class="btn btn-ghost" onclick="goToMyStream()">View Stream</button>
        <button class="btn btn-ghost" id="goLiveRemoveBtn" style="display:none;" onclick="removeGoLiveStreamFromList()">Remove From List</button>
        <button class="btn btn-live-pulse" id="goLivePublishBtn" onclick="publishStream()">Go Live Now</button>
      </div>
    </div>
    <div class="msuccess" id="mSuccess">
      <div class="succ-icon"></div>
      <div class="succ-title">You're Live on Nostr!</div>
      <div class="succ-text">Your NIP-53 event has been broadcast to 4 relays.</div>
      <div style="margin-top:1rem;display:flex;gap:.5rem;justify-content:center;">
        <button class="btn btn-primary" onclick="goToMyStream();closeGoLive()">View My Stream</button>
        <button class="btn btn-ghost" onclick="closeGoLive()">Close</button>
      </div>
    </div>
  </div>
</div>

<!-- ========= END STREAM CONFIRM ========= -->
<div class="modal-ov" id="endModal">
  <div class="end-confirm-modal">
    <div style="font-size:2rem;margin-bottom:.6rem"></div>
    <div style="font-family:'Syne',sans-serif;font-weight:800;font-size:1.05rem;margin-bottom:.4rem;">End Stream</div>
    <div style="font-size:.82rem;color:var(--text2);margin-bottom:1.2rem;line-height:1.5;">This will publish a <span style="font-family:'DM Mono',monospace;color:var(--purple)">kind:30311</span> ended event to your relays.</div>
    <div style="display:flex;gap:.55rem;justify-content:center;">
      <button class="btn" style="background:var(--live);color:#fff;" onclick="confirmEndStream()">End Stream</button>
      <button class="btn btn-ghost" onclick="closeEnd()">Keep Going</button>
    </div>
  </div>
</div>

<!-- ========= LOGIN MODAL ========= -->
<div class="modal-ov" id="loginModal">
  <div class="login-modal">
    <button class="lm-close" onclick="closeLogin()">x</button>
    <div class="lm-hd">
      <div class="lm-logo"><img src="logo.png" alt="" class="lm-logo-img"><span>Sifaka Live</span></div>
      <div class="lm-sub">Sign in with your Nostr identity - you own your keys.</div>
    </div>
    <div class="lm-body">
      <div class="lm-sec">Recommended</div>
      <div class="lo" onclick="loginDemo('wavesound','','npub1abc...xyz','wave@bitcoin-cats.ca')">
        <div class="lo-ico ext"></div>
        <div><div class="lo-t">Signer App or Extension</div><div class="lo-d">Alby, nos2x, Amber (Android), any NIP-07 extension.</div></div>
        <div class="lo-arr"></div>
      </div>
      <div class="lo" onclick="loginDemo('hardwareuser','','npub1hw1...abc','')">
        <div class="lo-ico hw"></div>
        <div><div class="lo-t">Hardware Signer</div><div class="lo-d">Coldcard, Keystone, or any NIP-46 bunker device.</div></div>
        <div class="lo-arr"></div>
      </div>
      <div class="lm-div"><span>or enter keys manually</span></div>
      <div class="key-wrap">
        <input class="key-inp" type="password" placeholder="nsec1... (stored locally only)">
        <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="loginDemo('keyuser','','npub1key...xyz','')">Sign In with nsec key</button>
      </div>
      <div class="lm-warn">Entering your private key is less secure. Sifaka Live never sends your key to any server.</div>
      <div class="lm-div"><span>or</span></div>
      <div class="lo" onclick="loginDemo('newnostr')" style="border-color:rgba(0,212,138,.2);">
        <div class="lo-ico new"></div>
        <div><div class="lo-t">Create New Identity</div><div class="lo-d">Generate a fresh keypair. No email, no phone - just cryptography.</div></div>
        <div class="lo-arr"></div>
      </div>
    </div>
  </div>
</div>

<!-- ========= ONBOARDING MODAL ========= -->
<div class="modal-ov" id="onboardingModal">
  <div class="settings-modal onboard-modal">
    <button class="mclose" style="position:absolute;top:1rem;right:1rem;z-index:2;" onclick="closeOnboarding()">&#x2715;</button>

    <!-- Step indicator -->
    <div class="onboard-steps-bar">
      <div class="onboard-step-dot active" id="onbDot1" data-n="1"></div>
      <div class="onboard-step-line" id="onbStepLine"></div>
      <div class="onboard-step-dot" id="onbDot2" data-n="2"></div>
    </div>

    <!-- Ã¢â€â‚¬Ã¢â€â‚¬ STEP 1: Save your key Ã¢â€â‚¬Ã¢â€â‚¬ -->
    <div class="onboard-step active" id="onbStep1">
      <div class="sm-hd" style="padding-bottom:.5rem">
        <div class="sm-title">Save Your Private Key</div>
        <div style="font-size:.78rem;color:var(--text2);margin-top:.2rem">This is your Nostr identity. Lose it and there's no recovery.</div>
      </div>

      <div class="onboard-key-hero">
        <div class="onboard-key-label">Your nsec (private key)</div>
        <div class="onboard-nsec-row">
          <div class="onboard-nsec-text" id="onbNsecValue">nsec1...</div>
          <div class="onboard-nsec-actions">
            <button class="onboard-reveal-btn" id="onbRevealBtn" onclick="onbRevealNsec()">&#128065; Reveal</button>
            <button class="onboard-copy-btn" id="onbCopyBtn" onclick="onbCopyNsec()">&#128203; Copy</button>
          </div>
        </div>
        <div class="onboard-warn-box">
          <strong>&#9888; Never share this key.</strong> Anyone who has it owns your identity forever. Sifaka Live never sends it to any server Ã¢â‚¬â€ it lives only in your browser.
        </div>
      </div>

      <label class="onboard-confirm-row" id="onbConfirmRow">
        <input type="checkbox" class="onboard-checkbox" id="onbSavedCheck" onchange="onbCheckSaved()">
        <span class="onboard-confirm-label">I have saved my private key somewhere safe (password manager, paper, hardware wallet).</span>
      </label>

      <button class="onboard-continue-btn" id="onbContinueBtn" onclick="onbGoToProfile()">
        Continue to Profile Setup &#8594;
      </button>
    </div>

    <!-- Ã¢â€â‚¬Ã¢â€â‚¬ STEP 2: Build your profile Ã¢â€â‚¬Ã¢â€â‚¬ -->
    <div class="onboard-step" id="onbStep2">
      <div class="sm-hd" style="padding-bottom:.5rem">
        <div class="sm-title">Build Your Profile</div>
        <div style="font-size:.78rem;color:var(--text2);margin-top:.2rem">All fields optional Ã¢â‚¬â€ you can update anytime from Settings.</div>
      </div>

      <!-- Avatar preview + name row -->
      <div class="onboard-avatar-preview-row">
        <div class="onboard-avatar-circle" id="onbAvatarPreview">?</div>
        <div class="onboard-avatar-fields">
          <div class="fg" style="margin:0">
            <label>Display Name</label>
            <input id="onbDisplayName" type="text" placeholder="SatsStreamer" oninput="onbUpdatePreview()">
          </div>
          <div class="fg" style="margin:0">
            <label>Avatar URL</label>
            <input id="onbAvatar" type="url" placeholder="https://example.com/avatar.jpg" oninput="onbUpdatePreview()">
            <div class="onboard-field-hint">Direct image link Ã¢â‚¬â€ paste from Imgur, Nostr.build, etc.</div>
          </div>
        </div>
      </div>

      <div class="onboard-form-grid">
        <div class="fg full" style="margin:0">
          <label>Bio</label>
          <textarea id="onbBio" placeholder="Tell people what you stream, build, or obsess over..." style="height:70px;resize:none;"></textarea>
        </div>
        <div class="fg" style="margin:0">
          <label>Banner URL</label>
          <input id="onbBanner" type="url" placeholder="https://example.com/banner.jpg">
          <div class="onboard-field-hint">1500Ãƒâ€”500 recommended</div>
        </div>
        <div class="fg" style="margin:0">
          <label>Website</label>
          <input id="onbWebsite" type="url" placeholder="https://your-site.com">
        </div>
        <div class="fg" style="margin:0">
          <label>Lightning Address (lud16)</label>
          <input id="onbLud16" type="text" placeholder="you@getalby.com">
          <div class="onboard-field-hint">For receiving Zaps &#9889;</div>
        </div>
        <div class="fg" style="margin:0">
          <label>NIP-05 Identifier</label>
          <input id="onbNip05" type="text" placeholder="you@yourdomain.com">
          <div class="onboard-field-hint">Verifies your identity on Nostr</div>
        </div>
      </div>

      <div class="onboard-footer-row">
        <button class="btn btn-ghost" onclick="onbBackToKey()">&#8592; Back</button>
        <button class="btn btn-ghost" onclick="skipOnboarding()">Skip</button>
        <button class="btn btn-primary" id="onbSaveBtn" onclick="completeOnboarding()">&#10003; Save &amp; Enter Sifaka Live</button>
      </div>
    </div>

  </div>
</div>

<!-- ========= SETTINGS MODAL V2 ========= -->
<div class="modal-ov" id="settingsModal">
  <div class="settings-modal-v2">
    <button class="mclose" style="position:absolute;top:1rem;right:1rem;z-index:2;" onclick="closeSettings()">&#x2715;</button>

    <!-- Header -->
    <div class="smv2-hd">
      <div class="smv2-title">Ã¢Å¡â„¢Ã¯Â¸Â Settings</div>
    </div>

    <!-- Tab bar -->
    <div class="smv2-tabs">
      <button class="smv2-tab tab-profile active" id="smTab-profile" onclick="switchSettingsTab('profile')">Ã°Å¸â€˜Â¤ Profile</button>
      <button class="smv2-tab tab-relays" id="smTab-relays" onclick="switchSettingsTab('relays')">Ã°Å¸â€œÂ¡ Relays</button>
      <button class="smv2-tab tab-app" id="smTab-app" onclick="switchSettingsTab('app')">Ã°Å¸Å½Â¨ App</button>
    </div>

    <!-- Ã¢â€â‚¬Ã¢â€â‚¬ Panel: Profile Ã¢â€â‚¬Ã¢â€â‚¬ -->
    <div class="smv2-panel active" id="smPanelProfile">
      <div class="smv2-panel-label">Ã°Å¸â€œâ€¹ NIP-01 kind:0 Ã¢â‚¬â€ your profile metadata published to relays</div>

      <!-- Avatar preview + name/username -->
      <div class="smv2-avatar-row">
        <div class="smv2-avatar-preview" id="smAvatarPreview">?</div>
        <div class="smv2-avatar-fields">
          <div class="fg" style="margin:0">
            <label>Display Name</label>
            <input id="settingsDisplayName" type="text" placeholder="SatsStreamer">
          </div>
          <div class="fg" style="margin:0">
            <label>Username (name)</label>
            <input id="settingsUsername" type="text" placeholder="satsstreamer">
          </div>
        </div>
      </div>

      <!-- Bio -->
      <div class="fg" style="margin-top:.7rem">
        <label>Bio (about)</label>
        <textarea id="settingsAbout" placeholder="Tell people what you stream, build, or obsess over..." style="min-height:80px;resize:vertical;"></textarea>
      </div>

      <!-- Avatar + Banner URLs -->
      <div class="smv2-field-row">
        <div class="fg" style="margin:0">
          <label>Avatar URL (picture)</label>
          <input id="settingsAvatarUrl" type="url" placeholder="https://example.com/avatar.jpg" oninput="previewSettingsAvatar(this.value)">
          <div class="smv2-field-hint">Direct image link Ã¢â‚¬â€ Imgur, nostr.build, etc.</div>
        </div>
        <div class="fg" style="margin:0">
          <label>Banner URL</label>
          <input id="settingsBannerInput" type="url" placeholder="https://example.com/banner.jpg">
          <div class="smv2-field-hint">Recommended 1500 Ãƒâ€” 500 px</div>
        </div>
      </div>

      <!-- Website + Lightning -->
      <div class="smv2-field-row">
        <div class="fg" style="margin:0">
          <label>Website</label>
          <input id="settingsWebsiteInput" type="url" placeholder="https://your-site.com">
        </div>
        <div class="fg" style="margin:0">
          <label>Ã¢Å¡Â¡ Lightning Address (lud16)</label>
          <input id="settingsLud16Input" type="text" placeholder="you@getalby.com">
        </div>
      </div>

      <!-- NIP-05 -->
      <div class="fg" style="margin-top:.65rem">
        <label>NIP-05 Identifier</label>
        <input id="settingsNip05Input" type="text" placeholder="you@yourdomain.com">
        <div class="smv2-field-hint">Nostr identity verification Ã¢â‚¬â€ host /.well-known/nostr.json on your domain</div>
      </div>

      <div class="smv2-save-row">
        <button class="btn btn-primary" onclick="saveProfileSettings()">Save Profile Ã¢â€ â€™</button>
      </div>
    </div>

    <!-- Ã¢â€â‚¬Ã¢â€â‚¬ Panel: Relays Ã¢â€â‚¬Ã¢â€â‚¬ -->
    <div class="smv2-panel" id="smPanelRelays">
      <div class="smv2-panel-label">Ã°Å¸â€œÂ¡ NIP-65 kind:10002 Ã¢â‚¬â€ your relay list is published to the network</div>
      <div id="settingsRelayList2"></div>
      <div class="relay-add-row">
        <input type="text" id="settingsRelayInput" placeholder="wss://relay.example.com" style="font-family:'DM Mono',monospace;font-size:.75rem;">
        <button class="btn btn-ghost" style="padding:.4rem .85rem;" onclick="addRelayFromSettings()">Add</button>
      </div>
      <div class="smv2-save-row">
        <button class="btn btn-primary" onclick="saveRelaySettings()">Save Relays Ã¢â€ â€™</button>
      </div>
    </div>

    <!-- Ã¢â€â‚¬Ã¢â€â‚¬ Panel: App Ã¢â€â‚¬Ã¢â€â‚¬ -->
    <div class="smv2-panel" id="smPanelApp">
      <div class="smv2-section">
        <div class="smv2-section-title">Streaming</div>
        <div class="sm-row"><div><div class="sm-row-label">Auto-publish NIP-53 event</div><div class="sm-row-desc">Broadcast stream info when you go live</div></div><div class="toggle setting-toggle on" id="setAutoPublishToggle" onclick="toggleSetting(this)"></div></div>
        <div class="sm-row"><div><div class="sm-row-label">Mini player on navigation</div><div class="sm-row-desc">Show floating player when browsing away</div></div><div class="toggle setting-toggle on" id="setMiniPlayerToggle" onclick="toggleSetting(this)"></div></div>
      </div>

      <div class="smv2-section">
        <div class="smv2-section-title">Zaps (NIP-57)</div>
        <div class="sm-row"><div><div class="sm-row-label">Show zap notifications in chat</div><div class="sm-row-desc">Animated zap messages visible in live chat</div></div><div class="toggle setting-toggle on" id="setZapNoticeToggle" onclick="toggleSetting(this)"></div></div>
        <div class="sm-row"><div><div class="sm-row-label">Animate zap notifications</div><div class="sm-row-desc">Slide-in animation for incoming zaps</div></div><div class="toggle setting-toggle on" id="setAnimateToggle" onclick="toggleSetting(this)"></div></div>
      </div>

      <div class="smv2-section">
        <div class="smv2-section-title">Interface</div>
        <div class="sm-row"><div><div class="sm-row-label">Show NIP-05 badges in chat</div><div class="sm-row-desc">Purple Ã¢Å“â€œ for verified identities</div></div><div class="toggle setting-toggle on" id="setNip05Toggle" onclick="toggleSetting(this)"></div></div>
        <div class="sm-row"><div><div class="sm-row-label">Compact chat mode</div><div class="sm-row-desc">Denser message layout in stream chat</div></div><div class="toggle setting-toggle" id="setCompactToggle" onclick="toggleSetting(this)"></div></div>
      </div>

      <div class="smv2-save-row">
        <button class="btn btn-primary" onclick="saveAppSettings()">Save App Settings Ã¢â€ â€™</button>
      </div>
    </div>
  </div>
</div>

<!-- ========= FAQ MODAL ========= -->
<div class="modal-ov" id="faqModal">
  <div class="settings-modal">
    <button class="mclose" style="position:absolute;top:1rem;right:1rem;" onclick="closeFaq()">x</button>
    <div class="sm-hd"><div class="sm-title">FAQ & Help</div></div>
    <div class="sm-body">
      <div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">What is NIP-53 <span class="faq-chevron">+</span></div><div class="faq-a">NIP-53 defines live streaming events on Nostr using <code style="font-family:'DM Mono',monospace;color:var(--purple)">kind:30311</code>. Fill in the Go Live form and Sifaka Live broadcasts your stream to relays - any NIP-53 compatible client can discover it.</div></div>
      <div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">How do I self-host my stream <span class="faq-chevron">+</span></div><div class="faq-a">Install nginx-rtmp on any VPS ($5/mo). Point OBS to your RTMP endpoint. Sifaka Live publishes the HLS URL to Nostr relays. No third-party CDN needed.</div></div>
      <div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">What is NIP-05 verification <span class="faq-chevron">+</span></div><div class="faq-a">NIP-05 links your npub to a domain (e.g. craig@bitcoin-cats.ca). You host a JSON file at your domain. Verified users get a purple badge in chat and on profiles.</div></div>
      <div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">How do Zaps work (NIP-57) <span class="faq-chevron">+</span></div><div class="faq-a">Add your Lightning address (lud16) to your NIP-01 profile. Viewers click Zap, their wallet pays a Lightning invoice, and the proof is published as a <code style="font-family:'DM Mono',monospace;color:var(--purple)">kind:9735</code> event in chat.</div></div>
      <div class="faq-item"><div class="faq-q" onclick="toggleFaq(this)">Which NIPs does Sifaka Live support <span class="faq-chevron">+</span></div><div class="faq-a">NIP-01 (profiles), NIP-05 (verification), NIP-07 (browser signing), NIP-25 (reactions/likes), NIP-46 (remote signing), NIP-53 (live streams), NIP-57 (zaps), NIP-65 (relay lists).</div></div>
    </div>
  </div>
</div>

<!-- ========= SHARE MODAL ========= -->
<div class="modal-ov" id="shareModal">
  <div class="settings-modal share-modal">
    <button class="mclose" style="position:absolute;top:1rem;right:1rem;" onclick="closeShareModal()">x</button>
    <div class="sm-hd"><div class="sm-title">Share Stream</div></div>
    <div class="share-modal-body">
      <div class="share-choice-grid">
        <button class="share-choice-btn" onclick="shareStreamAction('boost')"><span>Boost</span><span class="sub">Post to Nostr</span></button>
        <button class="share-choice-btn" onclick="shareStreamAction('copy')"><span>Copy Link</span><span class="sub">Web URL</span></button>
        <button class="share-choice-btn" onclick="shareStreamAction('app')"><span>Share App</span><span class="sub">Text / App</span></button>
      </div>
      <div class="share-field">
        <label>Web URL</label>
        <div class="share-copy-row">
          <input id="shareWebUrl" type="text" readonly>
          <button class="btn btn-ghost" style="padding:.34rem .62rem;" onclick="copyShareField('shareWebUrl')">Copy</button>
        </div>
      </div>
      <div class="share-field">
        <label>Nostr naddr</label>
        <div class="share-copy-row">
          <input id="shareNaddr" type="text" readonly>
          <button class="btn btn-ghost" style="padding:.34rem .62rem;" onclick="copyShareField('shareNaddr')">Copy</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ========= REACTION PICKER ========= -->
<div class="modal-ov" id="reactionPickerModal">
  <div class="settings-modal share-modal">
    <button class="mclose" style="position:absolute;top:1rem;right:1rem;" onclick="closeReactionPicker()">x</button>
    <div class="sm-hd"><div class="sm-title">React With Emoji</div></div>
    <div class="share-modal-body">
      <div class="reaction-picker-grid" id="reactionPickerGrid"></div>
      <div class="reaction-custom-row">
        <input id="reactionPickerCode" type="text" placeholder="Emoji or :shortcode:">
        <input id="reactionPickerUrl" type="text" placeholder="Custom emoji image URL (optional for :shortcode:)">
      </div>
      <div class="reaction-picker-foot">
        <button class="btn btn-ghost" onclick="closeReactionPicker()">Cancel</button>
        <button class="btn btn-primary" onclick="submitCustomReactionPicker()">Send</button>
      </div>
    </div>
  </div>
</div>

<!-- ========= HOME PAGE ========= -->
<div class="page active" id="homePage">
  <div class="hero-stream" id="heroStream">
    <div class="hero-bg"></div>
    <div class="hero-grid-ov"></div>

    <!-- Sci-fi transition overlay -->
    <div class="hero-transition-ov" id="heroTransitionOv">
      <div class="hero-scan-line" id="heroScanLine" style="display:none"></div>
      <div class="hero-glitch-a" id="heroGlitchA" style="display:none"></div>
      <div class="hero-glitch-b" id="heroGlitchB" style="display:none"></div>
      <div class="hero-grid-flash" id="heroGridFlash" style="display:none"></div>
      <div class="hero-static" id="heroStatic" style="display:none"></div>
    </div>

    <!-- Prev / Next -->
    <button class="hero-nav-btn hero-nav-prev" id="heroPrevBtn" onclick="event.stopPropagation();heroNav(-1)">&#8249;</button>
    <button class="hero-nav-btn hero-nav-next" id="heroNextBtn" onclick="event.stopPropagation();heroNav(1)">&#8250;</button>

    <!-- Dot indicators -->
    <div class="hero-indicators" id="heroIndicators"></div>

    <!-- Cycle progress bar -->
    <div class="hero-cycle-bar-wrap"><div class="hero-cycle-bar-fill" id="heroCycleBarFill"></div></div>

    <!-- Player -->
    <div class="hero-player" id="heroPlayer">
      <div class="hero-player-bg" id="heroPlayerBg"></div>
      <div class="play-ov" id="heroPlayOv"><div class="play-btn-big">&#9654;</div></div>
    </div>

    <!-- Info panel -->
    <div class="hero-info">
      <div class="hero-live-badge"><span class="live-dot"></span><span id="heroStatusLabel">LIVE</span></div>
      <div class="hero-title" id="heroTitle">Connecting to relaysÃ¢â‚¬Â¦</div>
      <div class="hero-host">
        <div class="hero-av" id="heroAv"></div>
        <span style="font-weight:600;color:var(--text)" id="heroHostName">Ã¢â‚¬â€</span>
        <span class="nip05-badge" id="heroNip05" style="display:none">&#10003;</span>
      </div>
      <div class="hero-summary" id="heroSummary">Finding live streams on NostrÃ¢â‚¬Â¦</div>
      <div class="hero-stats">
        <div class="h-stat"><div class="val" id="heroViewers">Ã¢â‚¬â€</div><div class="lbl">watching</div></div>
        <div class="h-stat zap"><div class="val" id="heroSats">Ã¢â‚¬â€</div><div class="lbl">sats</div></div>
        <div class="h-stat"><div class="val" id="heroTime">Ã¢â‚¬â€</div><div class="lbl">live</div></div>
      </div>
      <div class="hero-actions">
        <button class="btn btn-primary" id="heroWatchBtn" onclick="event.stopPropagation();heroWatchCurrent()">Watch</button>
        <button class="btn btn-zap" onclick="event.stopPropagation()">&#9889; Zap</button>
      </div>
    </div>
  </div>

  <div class="stream-main">
    <!-- Live Now header with list filter -->
    <div class="live-now-hd">
      <h2>Live Now</h2>
      <span class="live-count-pill" id="liveCountPill"></span>

      <!-- List filter dropdown (moved here from Following Live) -->
      <div class="list-filter-wrap" id="listFilterWrap">
        <button class="list-filter-btn" id="listFilterBtn" onclick="toggleListFilterDD(event)">
          <span class="list-filter-btn-label" id="listFilterLabel">All Live</span>
          <span class="list-filter-caret">&#9660;</span>
        </button>
        <div class="list-filter-dd" id="listFilterDD">
          <span class="lf-section-label">View</span>
          <button class="lf-item active" id="lf-all" onclick="setListFilter('all',this)">
            <span class="lf-dot"></span>
            <span class="lf-item-name">All Live</span>
          </button>
          <button class="lf-item" id="lf-following" onclick="setListFilter('following',this)">
            <span class="lf-dot"></span>
            <span class="lf-item-name">My Following</span>
            <span class="lf-item-count" id="lfFollowingCount"></span>
          </button>
          <div id="lf-nip51-section" style="display:none">
            <div class="lf-sep"></div>
            <span class="lf-section-label">My NIP-51 Lists</span>
            <div id="lf-nip51-items"></div>
          </div>
          <div id="lf-saved-section" style="display:none">
            <div class="lf-sep"></div>
            <span class="lf-section-label">Saved Lists</span>
            <div id="lf-saved-items"></div>
          </div>
          <div class="lf-sep"></div>
          <span class="lf-section-label">Add Curated List</span>
          <div class="lf-add-row">
            <input class="lf-add-input" id="lfAddInput" placeholder="naddr1Ã¢â‚¬Â¦ or listr.lol URL" oninput="lfAddInputChange(this)">
            <button class="lf-add-btn" onclick="lfAddList()">Add</button>
          </div>
          <div class="lf-add-hint">Paste a Liststr URL or NIP-51 naddr to load a curated list of streamers.</div>
        </div>
      </div>
    </div>

    <!-- Infinite-scroll grid -->
    <div class="live-grid" id="liveGrid">
      <div class="live-grid-loading"><div class="lf-spinner"></div>Syncing streams from relaysÃ¢â‚¬Â¦</div>
    </div>
    <div class="live-grid-sentinel" id="liveGridSentinel"></div>
  </div>
  <footer>
    <div class="flogo"><img src="logo.png" alt="" class="footer-logo-img"> Sifaka Live</div>
    <p>Open source - Censorship resistant - <a href="#" style="color:var(--accent);text-decoration:none">GitHub</a></p>
    <div class="nostr-pill">NIP-53 // kind:30311</div>
  </footer>
</div>

<!-- ========= COMMUNITIES PAGE ========= -->
<div id="communitiesPage">
  <div id="communitiesRoot"></div>
</div>
<!-- ========= VIDEO PAGE ========= -->
<div id="videoPage">
  <div class="video-layout">
    <div class="video-col">
      <!-- Player -->
      <div class="player-wrap">
        <div class="player-bg"></div>
        <div class="player-ui">
          <div class="pctrl-row">
            <button class="pc"></button>
            <button class="pc" style="font-size:.85rem"></button>
            <div class="pvol"><div class="pvol-f"></div></div>
            <div class="spacer"></div>
            <button class="end-stream-btn visible" id="endStreamBtn" onclick="openEnd()">End Stream</button>
            <div class="p-live" style="margin-left:.5rem"><span class="live-dot"></span>LIVE</div>
            <button class="pc" style="font-size:.85rem;margin-left:.5rem"></button>
          </div>
        </div>
      </div>

      <!-- Stream info -->
      <div class="sib">
        <!-- Top row: title left, action buttons flush right -->
        <div class="sib-top-row">
          <div class="sib-title-col">
            <div class="editable-row">
              <div class="sib-title">Indie Jazz Live Set - No Platform, No Rules</div>
              <button class="edit-pencil owner-only visible" title="Edit title"></button>
            </div>
          </div>
          <div class="sib-actions-row">
            <button class="btn btn-follow" id="theaterFollowBtn" style="padding:.36rem .8rem;font-size:.79rem;" onclick="toggleTheaterFollow()">Follow</button>
            <button class="btn btn-zap" id="theaterZapBtn" style="padding:.36rem .8rem;font-size:.79rem;" onclick="theaterZap()">Zap</button>
            <button class="action-btn share-btn" id="theaterShareBtn" onclick="shareStream()">Share</button>
            <button class="action-btn report-btn" title="Report stream">Report</button>
          </div>
        </div>
        <!-- Host row (avatar + name/nip05 + hosted-via pill injected by JS) -->
        <div class="sib-host-row">
          <div class="sib-av" onclick="showProfile('wavesound','','npub1abc...xyz','wave@bitcoin-cats.ca')"></div>
          <div class="sib-host-info">
            <div class="sib-name">wavesound
              <span class="nip05-badge" title="NIP-05 Verified: wave@bitcoin-cats.ca"></span>
            </div>
            <div class="sib-identity nip05-text">wave@bitcoin-cats.ca</div>
          </div>
        </div>

        <!-- Stats row -->
        <div class="sib-stats-row">
          <div class="ss fol"><span class="n" id="theaterFollowers">Ã¢â‚¬â€</span> <span class="l">followers</span></div>
          <div class="ss lv"><span class="n" id="theaterViewers">Ã¢â‚¬â€</span> <span class="l">watching</span></div>
          <div class="ss zap"><span class="n" id="theaterSats">Ã¢â‚¬â€</span> <span class="l">sats</span></div>
          <div class="ss"><span class="n" id="theaterRuntime">Ã¢â‚¬â€</span> <span class="l">live</span></div>
          <div class="ss"><span class="n" id="theaterRelays">Ã¢â‚¬â€</span> <span class="l">relays</span></div>
        </div>

        <!-- Editable summary -->
        <div class="editable-block" style="margin-top:.5rem">
          <div class="sib-summary">Live jazz set from my home studio. Self-hosted on a $5 VPS - no middlemen, no censorship.</div>
          <button class="block-pencil owner-only visible" title="Edit description"></button>
        </div>
        <div class="sib-stream-link-row" id="theaterStreamLinkRow" style="display:none;">
          <span class="lbl">Link</span>
          <a class="sib-stream-link" id="theaterStreamLink" href="#" target="_blank" rel="noopener noreferrer"></a>
        </div>
        <div class="stream-reactions-row">
          <button class="stream-emoji-add" id="streamEmojiAddBtn" onclick="openReactionPickerForStream()">+</button>
          <div class="stream-emoji-list" id="streamEmojiList"></div>
          <div class="stream-like-counter" id="streamLikeCounter">0 likes</div>
        </div>
      </div>

      <!-- Recommended -->
      <div class="reco">
        <div class="reco-title">Also Live Now</div>
        <div id="recoList"></div>
      </div>
    </div>

    <!-- Chat sidebar -->
    <div class="stream-sidebar">
      <div class="stabs">
        <div class="stab active" onclick="switchTab('chat')">Live Chat</div>
      </div>
      <div class="chat-scroll" id="chatScroll">
        <div class="cmsg"><div class="c-av" onclick="showProfile('fiatjaf','','npub1zl3...gz4','fiatjaf@nostr.com')"></div><div class="c-body"><div class="c-name-row"><span class="c-name co" onclick="showProfile('fiatjaf','','npub1zl3...gz4','fiatjaf@nostr.com')">fiatjaf</span><span class="c-nip05" title="fiatjaf@nostr.com"></span></div><div class="c-text">incredible session wavesound </div></div><div class="chat-msg-actions"><button class="cma-btn" title="Reply"></button><button class="cma-btn like-cma" title="Like"></button><button class="cma-btn zap-cma" title="Zap"></button><button class="cma-btn" title="Share"></button></div></div>
        <div class="cmsg"><div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name cp">satsoshi99</span></div><div class="c-text">this is why we build on nostr</div></div><div class="chat-msg-actions"><button class="cma-btn" title="Reply"></button><button class="cma-btn like-cma" title="Like"></button><button class="cma-btn zap-cma" title="Zap"></button><button class="cma-btn" title="Share"></button></div></div>
        <div class="cmsg zap-ev"><div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name cz">ZAP - 1,000 sats</span></div><div class="c-text">beautiful chord at 42:10!</div></div></div>
        <div class="cmsg"><div class="c-av" onclick="showProfile('relayrunner','','npub1ghi...rst','relay@nostr.run')"></div><div class="c-body"><div class="c-name-row"><span class="c-name cg" onclick="showProfile('relayrunner','','npub1ghi...rst','relay@nostr.run')">relayrunner</span><span class="c-nip05" title="relay@nostr.run"></span></div><div class="c-text">what's your RTMP setup</div></div><div class="chat-msg-actions"><button class="cma-btn" title="Reply"></button><button class="cma-btn like-cma" title="Like"></button><button class="cma-btn zap-cma" title="Zap"></button><button class="cma-btn" title="Share"></button></div></div>
        <div class="cmsg"><div class="c-av" onclick="showProfile('wavesound','','npub1abc...xyz','wave@bitcoin-cats.ca')"></div><div class="c-body"><div class="c-name-row"><span class="c-name co" onclick="showProfile('wavesound','','npub1abc...xyz','wave@bitcoin-cats.ca')">wavesound</span><span class="c-nip05" title="wave@bitcoin-cats.ca"></span></div><div class="c-text">nginx-rtmp on a $5 Hetzner VPS!</div></div><div class="chat-msg-actions"><button class="cma-btn" title="Reply"></button><button class="cma-btn like-cma" title="Like"></button><button class="cma-btn zap-cma" title="Zap"></button><button class="cma-btn" title="Share"></button></div></div>
        <div class="cmsg"><div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name">nostrdev</span></div><div class="c-text">NIP-53 is so underrated</div></div><div class="chat-msg-actions"><button class="cma-btn" title="Reply"></button><button class="cma-btn like-cma" title="Like"></button><button class="cma-btn zap-cma" title="Zap"></button><button class="cma-btn" title="Share"></button></div></div>
        <div class="cmsg zap-ev"><div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name cz">ZAP - 21,000 sats</span></div><div class="c-text">WAGMI no platforms </div></div></div>
        <div class="cmsg"><div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name cp">bitlover</span></div><div class="c-text">streaming from your own server is based</div></div><div class="chat-msg-actions"><button class="cma-btn" title="Reply"></button><button class="cma-btn like-cma" title="Like"></button><button class="cma-btn zap-cma" title="Zap"></button><button class="cma-btn" title="Share"></button></div></div>
        <div class="cmsg zap-ev"><div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name cz">ZAP - 5,000 sats</span></div><div class="c-text">encore!</div></div></div>
      </div>
      <div class="viewers-panel" id="viewersPanel">
        <div style="font-size:.71rem;color:var(--muted);font-family:'DM Mono',monospace;padding:.18rem .38rem;">2,105 watching</div>
        <div class="vr" onclick="showProfile('fiatjaf','','npub1zl3...gz4','fiatjaf@nostr.com')"><div class="v-av"></div><div><div class="v-name">fiatjaf <span class="c-nip05"></span></div><div class="v-npub">fiatjaf@nostr.com</div></div><span class="v-badge vb-z">top</span></div>
        <div class="vr"><div class="v-av"></div><div><div class="v-name">satsoshi99</div><div class="v-npub">npub1def...uvw</div></div></div>
        <div class="vr" onclick="showProfile('relayrunner','','npub1ghi...rst','relay@nostr.run')"><div class="v-av"></div><div><div class="v-name">relayrunner <span class="c-nip05"></span></div><div class="v-npub">relay@nostr.run</div></div></div>
        <div class="vr"><div class="v-av"></div><div><div class="v-name">nostrdev</div><div class="v-npub">npub1jkl...opq</div></div><span class="v-badge vb-l">live</span></div>
      </div>
      <div class="chat-bottom">
        <div class="chat-iw">
          <textarea class="chat-inp" placeholder="Send a message..." rows="2"></textarea>
        </div>
        <div class="chat-acts">
          <button class="chat-send-btn">Send</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ========= PROFILE PAGE ========= -->
<div id="profilePage">
  <div class="profile-hero">
    <img id="profBannerImg" class="profile-banner-img" alt="Profile banner" src="">
  </div>
  <div class="profile-content">
    <div class="profile-top">
      <div class="profile-left-stack">
        <div class="profile-head-row">
          <div class="profile-av-wrap"><div class="profile-av-big" id="profAv">U</div></div>
          <div class="profile-identity-box" id="profileIdentityBox">
            <div class="profile-name-row">
              <div class="profile-name" id="profName">Profile</div>
              <span class="nip05-badge" style="font-size:.95rem;display:none" id="profNip05Check">&#10003;</span>
            </div>
            <div class="profile-nip05" id="profNip05" style="display:none">NIP-05: not set</div>
            <div class="profile-npub" id="profNpub">npub</div>
            <div class="profile-kind30315-row" id="profKind30315Row">
              <span id="profKind30315"></span>
            </div>
            <div class="profile-kind30315-edit" id="profKind30315Edit" style="display:none;">
              <input class="profile-kind30315-input" id="profKind30315Input" type="text" maxlength="180" placeholder="Set status">
              <button class="profile-kind30315-save" id="profKind30315SaveBtn" onclick="saveProfileKind30315Status()">Save</button>
            </div>
          </div>
        </div>

        <div class="profile-bio-box">
          <div class="profile-bio-grid" id="profileBioGrid">
            <div>
              <div class="profile-bio clamped" id="profBio">No bio yet.</div>
              <button class="profile-show-more" id="profBioToggle" style="display:none;" onclick="toggleProfileBio()">Show more</button>
              <div class="profile-bio-links">
                <div class="profile-bio-meta" id="profWebsiteRow" style="display:none;"><span class="lbl">Website</span><a id="profWebsiteBio" href="#" target="_blank" rel="noopener noreferrer"></a></div>
                <div class="profile-bio-meta" id="profLud16Row" style="display:none;"><span class="lbl">Lightning</span><span class="val" id="profLud16Bio"></span></div>
                <div class="profile-bio-meta" id="profTwitterRow" style="display:none;"><span class="lbl">Twitter</span><a id="profTwitterBio" href="#" target="_blank" rel="noopener noreferrer"></a></div>
                <div class="profile-bio-meta" id="profGithubRow" style="display:none;"><span class="lbl">GitHub</span><a id="profGithubBio" href="#" target="_blank" rel="noopener noreferrer"></a></div>
              </div>
              <div class="profile-since" id="profNostrSince" style="display:none"></div>
            </div>
            <!-- Badges panel: shown only when badges are present -->
            <div class="profile-badges-panel" id="profileBadgesPanel" style="display:none;">
              <div class="profile-badges-title">Ã°Å¸Ââ€¦ Badges</div>
              <div class="profile-badges-grid" id="profileBadgesGrid"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-right-stack">
        <div class="profile-action-box">
          <div class="profile-actions-row">
            <button class="btn btn-ghost" id="profileMessageBtn" onclick="openProfileMessage()">Message</button>
            <button class="btn btn-zap" id="profileZapBtn">Zap</button>
            <button class="btn btn-follow" id="profileFollowBtn" onclick="toggleFollowProfile()">Follow</button>
            <button class="btn btn-primary" id="profileEditBtn" onclick="openProfileEditSettings()" style="display:none;">Edit Profile</button>
            <div class="atl-wrap" id="atlWrap">
              <button class="btn btn-ghost" id="profileAddToListBtn" onclick="toggleAtlDropdown(event)">Add to List Ã¢â€“Â¾</button>
              <div class="atl-dropdown" id="atlDropdown">
                <span class="atl-label">My NIP-51 Lists</span>
                <div id="atlListItems"><div class="atl-empty">No lists yet Ã¢â‚¬â€ create one below.</div></div>
                <button class="atl-item atl-create" onclick="atlShowCreateRow()">Ã¢Å¾â€¢ Create new list</button>
                <div class="atl-new-row" id="atlNewRow" style="display:none;">
                  <input class="atl-new-input" id="atlNewInput" placeholder="List nameÃ¢â‚¬Â¦" onkeydown="if(event.key==='Enter')atlCreateList()">
                  <button class="atl-new-btn" onclick="atlCreateList()">Create</button>
                </div>
              </div>
            </div>
            <button class="btn btn-ghost" id="profileShareBtn" onclick="shareProfile()">Share</button>
            <button class="action-btn report-btn" title="Report">Report</button>
          </div>
        </div>

        <div class="profile-inline-meta">
          <div class="profile-inline-stats">
            <div class="pis"><div class="iv" id="profFollowers">0</div><div class="il">Followers</div></div>
            <div class="pis"><div class="iv" id="profFollowing">0</div><div class="il">Following</div></div>
            <div class="pis"><div class="iv" id="profPostCount">0</div><div class="il">Post Count</div></div>
            <div class="pis"><div class="iv" id="profStreams">0</div><div class="il">Stream Count</div></div>
            <div class="pis"><div class="iv" id="profNostrAgeStat">-</div><div class="il">Time on Nostr</div></div>
            <div class="pis"><div class="iv" id="profSats">0</div><div class="il">Total Sats Received</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-main-grid">
      <div class="profile-col">

        <!-- Compose box: only shown on own profile -->
        <div class="profile-compose-box hidden" id="profileComposeBox">
          <div class="profile-compose-header">
            <div class="profile-compose-av" id="profileComposeAv">U</div>
            <span class="profile-compose-label">Share a note</span>
          </div>
          <textarea class="profile-compose-textarea" id="profileComposeText" placeholder="What's on your mind?" maxlength="4096" oninput="profileComposeInput(this)"></textarea>
          <div class="profile-compose-footer">
            <button class="profile-compose-btn" id="profileComposeBtn" onclick="publishProfileNote()">Post Note</button>
          </div>
        </div>

        <div class="profile-card" id="profileLiveWrap" style="display:none;">
          <div class="profile-sec-head">
            <h3>Live Now</h3>
            <span id="profLiveStatus">offline</span>
          </div>
          <div class="profile-live-player" id="profileLivePlayer">No live stream right now.</div>
          <div class="profile-live-foot">
            <button class="btn btn-primary" style="font-size:.78rem;padding:.38rem .72rem;" onclick="openStreamFromProfile()">Open in Theater</button>
          </div>
        </div>

        <div class="profile-card" id="profilePostsLeft">
          <div class="profile-sec-head">
            <h3>Posts</h3>
            <span id="profileFeedCount">0 notes</span>
          </div>
          <div id="profileFeedList" class="profile-feed-list">
            <div class="profile-feed-empty">Loading notes from relays...</div>
          </div>
        </div>
      </div>

      <div class="profile-side">
        <div class="profile-card profile-media-card">
          <div class="profile-tab-row">
            <button class="profile-tab" id="profileTabBtnPosts" onclick="switchProfileTab('posts')" style="display:none;">Posts</button>
            <button class="profile-tab active" id="profileTabBtnStreams" onclick="switchProfileTab('streams')">Past Streams</button>
            <button class="profile-tab" id="profileTabBtnMedia" onclick="switchProfileTab('media')">Media</button>
          </div>

          <div class="profile-tab-pane" id="profileTabPosts">
            <div id="profileFeedListSide" class="profile-feed-list">
              <div class="profile-feed-empty">Loading notes from relays...</div>
            </div>
          </div>
          <div class="profile-tab-pane on" id="profileTabStreams">
            <div id="profilePastStreamsList" class="profile-media-list">
              <div class="profile-feed-empty">Loading stream history...</div>
            </div>
          </div>
          <div class="profile-tab-pane" id="profileTabMedia">
            <div id="profileVideosList" class="profile-video-grid" style="margin-bottom:.75rem;"></div>
            <div id="profilePhotosList" class="profile-photo-grid"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="padding:.65rem 1.5rem;border-top:1px solid var(--border);">
    <button class="btn btn-ghost" onclick="goBackFromProfile()" style="font-size:.79rem;">Back</button>
  </div>
</div>

<!-- ========= ALL BADGES POPUP ========= -->
<div class="all-badges-popup-ov" id="allBadgesPopupOv" onclick="closeAllBadgesPopup(event)">
  <div class="all-badges-popup">
    <div class="abp-hd">
      <div class="abp-title">Ã°Å¸Ââ€¦ All Badges</div>
      <button class="badge-popup-close" onclick="closeAllBadgesPopup()">Ã¢Å“â€¢</button>
    </div>
    <div class="abp-body">
      <div class="abp-grid" id="allBadgesGrid"></div>
    </div>
  </div>
</div>

<!-- ========= BADGE DETAIL POPUP ========= -->
<div class="badge-popup-ov" id="badgePopupOv" onclick="closeBadgePopup(event)">
  <div class="badge-popup">
    <button class="badge-popup-close" onclick="closeBadgePopup()">Ã¢Å“â€¢</button>
    <div class="badge-popup-img-wrap" id="badgePopupImgWrap">Ã°Å¸Ââ€¦</div>
    <div class="badge-popup-body">
      <div class="badge-popup-name" id="badgePopupName">Badge Name</div>
      <div class="badge-popup-desc" id="badgePopupDesc"></div>
      <div class="badge-popup-meta" id="badgePopupMeta"></div>
    </div>
  </div>
</div>

<!-- ========= SCRIPTS ========= -->
<script type="module" src="./communities/boot.js"></script>
<script src="./nostrflux-app.js"></script>
</body>
</html>




























~~~

## nostrflux-app.js
~~~js
(function () {
  const DEFAULT_RELAYS = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.snort.social',
    'wss://nostr.wine',
    'wss://relay.primal.net'
  ];

  const KIND_PROFILE = 0;
  const KIND_DELETION = 5;
  const KIND_CONTACTS = 3;
  const KIND_REACTION = 7;
  const KIND_LIVE_EVENT = 30311;
  const KIND_LIVE_CHAT = 1311;
  const KIND_ZAP_RECEIPT = 9735;
  const KIND_PROFILE_STATUS = 30315;
  const KIND_PEOPLE_LIST = 30000;   // NIP-51 people list
  const KIND_GENERIC_LIST = 30001;  // NIP-51 generic list (bookmark-style)

  const LOCAL_NSEC_STORAGE_KEY = 'nostrflux_local_nsec';
  const NOSTR_TOOLS_SRC = 'https://unpkg.com/nostr-tools/lib/nostr.bundle.js';
  const HLS_JS_SRC = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.17/dist/hls.min.js';
  const SETTINGS_STORAGE_KEY = 'nostrflux_settings_v1';
  const FOLLOWING_STORAGE_KEY = 'nostrflux_following_pubkeys_v1';
  const HIDDEN_ENDED_STREAMS_STORAGE_KEY = 'nostrflux_hidden_ended_streams_v1';
  const NIP05_LOOKUP_CACHE_TTL_MS = 1000 * 60 * 30;
  const NIP05_LOOKUP_MISS_CACHE_TTL_MS = 1000 * 60 * 3;
  const NIP05_LOOKUP_ERROR_CACHE_TTL_MS = 1000 * 45;
  const NIP05_UNVERIFIED_CACHE_TTL_MS = 1000 * 60 * 2;

  const DEFAULT_SETTINGS = {
    relays: [...DEFAULT_RELAYS],
    autoPublish: true,
    miniPlayer: true,
    showZapNotifications: true,
    showNip05Badges: true,
    compactChat: false,
    animateZaps: true,
    lud16: '',
    website: '',
    banner: ''
  };

  const SAVED_LISTS_STORAGE_KEY = 'nostrflux_saved_lists_v1';

  const state = {
    relays: [...DEFAULT_RELAYS],
    settings: { ...DEFAULT_SETTINGS },
    pool: null,
    user: null,
    authMode: 'readonly',
    localSecretKey: null,
    pendingOnboardingNsec: '',
    streamsByAddress: new Map(),
    profilesByPubkey: new Map(),
    profileNotesByPubkey: new Map(),
    profileStatsByPubkey: new Map(),
    liveSubId: null,
    profileSubId: null,
    chatSubId: null,
    profileFeedSubId: null,
    profileStatsSubId: null,
    profileStatusSubId: null,
    nip51SubId: null,
    contactsSubId: null,
    savedListsSubId: null,
    selectedStreamAddress: null,
    selectedProfilePubkey: null,
    selectedProfileLiveAddress: null,
    profileTab: 'streams',
    profileBioExpandedByPubkey: new Map(),
    isLive: false,
    hlsInstance: null,
    playbackToken: 0,
    profileHlsInstance: null,
    profilePlaybackToken: 0,
    relayPulseTimer: null,
    followedPubkeys: new Set(),
    contactListPubkeys: new Set(),          // from kind:3 contact list
    contactsLatestCreatedAt: 0,
    contactsContent: '',
    contactsPTagByPubkey: new Map(),
    contactsOtherTags: [],
    followPublishPending: false,
    nip51Lists: new Map(),                  // listId -> { name, pubkeys, kind, d }
    savedExternalLists: [],                 // [{ naddr, name, pubkeys }] from Liststr/external
    activeListFilter: 'all',               // 'all' | 'following' | 'contacts' | listId | naddr
    listFilterDDOpen: false,
    // Hero featured stream cycling
    heroHlsInstance: null,
    heroPlaybackToken: 0,
    featuredIndex: 0,
    featuredCurrentAddress: '',
    featuredCycleTimer: null,
    featuredCycleStart: 0,
    featuredCycleRafId: null,
    featuredFailed: new Set(),             // addresses that failed playback
    // Infinite scroll
    liveGridPage: 0,
    liveGridObserver: null,
    GRID_PAGE_SIZE: 20,
    scriptPromises: {},
    streamZapTotals: new Map(),
    _theaterRuntimeInterval: null,
    likedStreamAddresses: new Set(),  // tracks which streams the user has liked
    streamLikeEventIdByAddress: new Map(),
    streamLikePublishPending: false,
    boostedStreamAddresses: new Set(),
    streamBoostEventIdByAddress: new Map(),
    streamBoostCheckedByAddress: new Set(),
    streamBoostCheckPendingByAddress: new Set(),
    streamReactionPubkeysByKey: new Map(),
    streamReactionMetaByKey: new Map(),
    streamReactionIdByKeyAndPubkey: new Map(),
    streamReactionEventById: new Map(),
    streamOwnReactionIdByKey: new Map(),
    streamReactionPublishPendingByKey: new Set(),
    chatReactionSubId: null,
    chatLikePubkeysByMessageId: new Map(),
    chatReactionIdByMessageAndPubkey: new Map(),
    chatReactionEventById: new Map(), // reactionEventId -> { messageId, pubkey }
    chatOwnLikeEventByMessageId: new Map(),
    chatMessageEventsById: new Map(),
    chatLikePublishPendingByMessageId: new Set(),
    postReactionPublishPendingByNoteAndKey: new Set(),
    reactionPickerTarget: null,
    shareModalStreamAddress: '',
    activeViewerAddress: '',
    activeHeroViewerAddress: '',
    goLiveSelectedAddress: '',
    goLiveHiddenEndedAddresses: new Set(),
    profileStatusByPubkey: new Map(),
    profileStatusSavePending: false,
    nip05VerificationByPubkey: new Map(),   // pubkey -> { nip05, verified, checkedAt }
    nip05VerificationPendingByPubkey: new Set(),
    nip05LookupCacheByNip05: new Map(),     // nip05 -> { pubkey, checkedAt }
    pendingRouteAddress: '',
    pendingRouteNaddr: ''
  };

  class RelayPool {
    constructor(urls, onStatus) {
      this.urls = [...new Set(urls)];
      this.onStatus = onStatus;
      this.sockets = new Map();
      this.subscriptions = new Map();
      this.connectAll();
    }

    connectAll() {
      this.urls.forEach((url) => this.connect(url));
    }

    connect(url) {
      let ws;
      try {
        ws = new WebSocket(url);
      } catch (_) {
        this.onStatus(url, 'error');
        return;
      }

      ws.addEventListener('open', () => {
        this.onStatus(url, 'open');
        this.subscriptions.forEach((sub, id) => {
          this.send(url, ['REQ', id, ...sub.filters]);
        });
      });

      ws.addEventListener('message', (msg) => {
        let data;
        try {
          data = JSON.parse(msg.data);
        } catch (_) {
          return;
        }
        if (!Array.isArray(data)) return;
        const type = data[0];
        if (type === 'EVENT') {
          const sub = this.subscriptions.get(data[1]);
          if (sub && sub.handlers && typeof sub.handlers.event === 'function') {
            sub.handlers.event(data[2], url);
          }
        } else if (type === 'EOSE') {
          const sub = this.subscriptions.get(data[1]);
          if (sub && sub.handlers && typeof sub.handlers.eose === 'function') {
            sub.handlers.eose(url);
          }
        } else if (type === 'OK') {
          const eventId = data[1];
          const ok = data[2];
          const reason = data[3] || '';
          if (window.console && !ok) {
            console.warn('Relay reject', url, eventId, reason);
          }
        }
      });

      ws.addEventListener('error', () => this.onStatus(url, 'error'));
      ws.addEventListener('close', () => {
        this.onStatus(url, 'closed');
        setTimeout(() => this.connect(url), 3000);
      });

      this.sockets.set(url, ws);
    }

    send(url, payload) {
      const ws = this.sockets.get(url);
      if (!ws || ws.readyState !== WebSocket.OPEN) return false;
      ws.send(JSON.stringify(payload));
      return true;
    }

    subscribe(filters, handlers) {
      const id = `sub_${Math.random().toString(36).slice(2, 10)}`;
      this.subscriptions.set(id, { filters, handlers });
      this.urls.forEach((url) => {
        this.send(url, ['REQ', id, ...filters]);
      });
      return id;
    }

    unsubscribe(id) {
      this.subscriptions.delete(id);
      this.urls.forEach((url) => {
        this.send(url, ['CLOSE', id]);
      });
    }

    publish(event) {
      let sent = 0;
      this.urls.forEach((url) => {
        if (this.send(url, ['EVENT', event])) sent += 1;
      });
      return sent;
    }

    destroy() {
      this.subscriptions.forEach((_value, id) => {
        this.urls.forEach((url) => this.send(url, ['CLOSE', id]));
      });
      this.subscriptions.clear();
      this.sockets.forEach((ws) => {
        try {
          ws.close();
        } catch (_) {
          // ignore
        }
      });
      this.sockets.clear();
    }
  }

  function qs(sel, root = document) {
    return root.querySelector(sel);
  }

  function qsa(sel, root = document) {
    return Array.from(root.querySelectorAll(sel));
  }

  function shortHex(hex) {
    if (!hex || hex.length < 16) return hex || '';
    return `${hex.slice(0, 8)}...${hex.slice(-8)}`;
  }

  function toUnixSeconds(dtLocal) {
    if (!dtLocal) return null;
    const t = new Date(dtLocal).getTime();
    if (Number.isNaN(t)) return null;
    return Math.floor(t / 1000);
  }

  function fromUnixSeconds(ts) {
    if (!ts) return '';
    const d = new Date(ts * 1000);
    const yyyy = d.getUTCFullYear();
    const mm = `${d.getUTCMonth() + 1}`.padStart(2, '0');
    const dd = `${d.getUTCDate()}`.padStart(2, '0');
    const hh = `${d.getUTCHours()}`.padStart(2, '0');
    const mi = `${d.getUTCMinutes()}`.padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }

  function pickAvatar(seed) {
    const pool = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    if (!seed) return pool[0];
    let sum = 0;
    for (let i = 0; i < seed.length; i += 1) sum += seed.charCodeAt(i);
    return pool[sum % pool.length];
  }

  function loadExternalScript(src, globalName, timeoutMs = 15000) {
    const key = `${src}::${globalName}`;
    if (state.scriptPromises[key]) return state.scriptPromises[key];
    if (globalName && window[globalName]) return Promise.resolve(window[globalName]);

    state.scriptPromises[key] = new Promise((resolve, reject) => {
      const existing = qsa(`script[src="${src}"]`)[0];
      if (existing) {
        const started = Date.now();
        const timer = setInterval(() => {
          if (globalName && window[globalName]) {
            clearInterval(timer);
            resolve(window[globalName]);
          } else if (Date.now() - started > timeoutMs) {
            clearInterval(timer);
            reject(new Error(`Timed out loading ${src}`));
          }
        }, 100);
        return;
      }

      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = () => {
        if (globalName && !window[globalName]) {
          reject(new Error(`${globalName} did not load from ${src}`));
          return;
        }
        resolve(globalName ? window[globalName] : true);
      };
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });

    return state.scriptPromises[key];
  }

  async function ensureNostrTools() {
    if (window.NostrTools) return window.NostrTools;
    return loadExternalScript(NOSTR_TOOLS_SRC, 'NostrTools');
  }

  async function ensureHlsJs() {
    if (window.Hls) return window.Hls;
    return loadExternalScript(HLS_JS_SRC, 'Hls');
  }

  function hexToBytes(hex) {
    const clean = (hex || '').trim().toLowerCase();
    if (!/^[0-9a-f]{64}$/.test(clean)) {
      throw new Error('Invalid hex private key.');
    }
    const out = new Uint8Array(32);
    for (let i = 0; i < 32; i += 1) {
      out[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16);
    }
    return out;
  }

  function bytesToHex(bytes) {
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function normalizeSecretKey(secret) {
    if (!secret) throw new Error('Missing secret key');
    if (secret instanceof Uint8Array) return secret;
    if (Array.isArray(secret)) return Uint8Array.from(secret);
    if (typeof secret === 'string') return hexToBytes(secret);
    throw new Error('Unsupported secret key format');
  }

  function sanitizeMediaUrl(v) {
    const raw = String(v || '').trim();
    if (!raw) return '';
    const unwrapped = raw.replace(/^['"]+|['"]+$/g, '');
    return unwrapped
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .trim();
  }

  function isLikelyUrl(v) {
    const clean = sanitizeMediaUrl(v);
    return !!clean && /^https?:\/\//i.test(clean);
  }

  function normalizeTwitterLink(value) {
    const raw = (value || '').trim();
    if (!raw) return { url: '', label: '' };
    if (isLikelyUrl(raw)) return { url: raw, label: raw };
    let handle = raw.replace(/^@+/, '');
    handle = handle.replace(/^https?:\/\/(www\.)?(x\.com|twitter\.com)\//i, '');
    handle = handle.split(/[/?#]/)[0] || '';
    if (!handle) return { url: '', label: '' };
    return { url: `https://x.com/${handle}`, label: `@${handle}` };
  }

  function normalizeGithubLink(value) {
    const raw = (value || '').trim();
    if (!raw) return { url: '', label: '' };
    if (isLikelyUrl(raw)) return { url: raw, label: raw };
    let handle = raw.replace(/^@+/, '');
    handle = handle.replace(/^https?:\/\/(www\.)?github\.com\//i, '');
    handle = handle.split(/[/?#]/)[0] || '';
    if (!handle) return { url: '', label: '' };
    return { url: `https://github.com/${handle}`, label: handle };
  }

  function setProfileVerificationStyle(mode) {
    const identityBox = qs('#profileIdentityBox');
    const avatar = qs('#profAv');
    const nip05Main = qs('#profNip05');
    const nip05Check = qs('#profNip05Check');
    const resolved = (mode === true || mode === 'verified')
      ? 'verified'
      : (mode === 'invalid' ? 'invalid' : 'none');
    if (identityBox) identityBox.classList.toggle('nip05-verified', resolved === 'verified');
    if (avatar) avatar.classList.toggle('nip05-verified', resolved === 'verified');
    if (nip05Main) nip05Main.classList.toggle('nip05-invalid', resolved === 'invalid');
    if (nip05Check) nip05Check.classList.toggle('nip05-invalid', resolved === 'invalid');
  }

  function setAvatarEl(el, pictureValue, fallbackText) {
    if (!el) return;
    const raw = sanitizeMediaUrl(pictureValue);
    el.innerHTML = '';

    if (isLikelyUrl(raw)) {
      const img = document.createElement('img');
      img.src = raw;
      img.alt = 'avatar';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.onerror = () => { el.textContent = fallbackText; };
      el.appendChild(img);
      return;
    }

    if (raw) {
      el.textContent = raw;
      return;
    }

    el.textContent = fallbackText;
  }

  function loadSettingsFromStorage() {
    let saved = {};
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      saved = raw ? JSON.parse(raw) : {};
    } catch (_) {
      saved = {};
    }

    const merged = { ...DEFAULT_SETTINGS, ...(saved || {}) };
    if (!Array.isArray(merged.relays) || merged.relays.length === 0) {
      merged.relays = [...DEFAULT_RELAYS];
    }
    merged.relays = [...new Set(merged.relays.map((r) => (r || '').trim()).filter((r) => /^wss:\/\//i.test(r)))];
    if (!merged.relays.length) merged.relays = [...DEFAULT_RELAYS];

    state.settings = merged;
    state.relays = [...merged.relays];
  }

  function persistSettings() {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state.settings));
    } catch (_) {
      // no-op
    }
  }

  function normalizePubkeyHex(pubkey) {
    const normalized = (pubkey || '').trim().toLowerCase();
    return /^[0-9a-f]{64}$/.test(normalized) ? normalized : '';
  }

  function loadFollowedPubkeys() {
    let saved = [];
    try {
      const raw = localStorage.getItem(FOLLOWING_STORAGE_KEY);
      saved = raw ? JSON.parse(raw) : [];
    } catch (_) {
      saved = [];
    }

    const list = Array.isArray(saved) ? saved : [];
    state.followedPubkeys = new Set(
      list
        .map((v) => normalizePubkeyHex(typeof v === 'string' ? v : ''))
        .filter(Boolean)
    );
  }

  function persistFollowedPubkeys() {
    try {
      localStorage.setItem(FOLLOWING_STORAGE_KEY, JSON.stringify(Array.from(state.followedPubkeys)));
    } catch (_) {
      // no-op
    }
  }

  function readHiddenEndedStreamsStore() {
    try {
      const raw = localStorage.getItem(HIDDEN_ENDED_STREAMS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function loadHiddenEndedStreamsForPubkey(pubkey) {
    const key = normalizePubkeyHex(pubkey);
    if (!key) return new Set();
    const store = readHiddenEndedStreamsStore();
    const list = Array.isArray(store[key]) ? store[key] : [];
    return new Set(
      list
        .map((v) => String(v || '').trim())
        .filter((v) => /^[0-9]+:[0-9a-f]{64}:.+/i.test(v))
    );
  }

  function persistHiddenEndedStreamsForCurrentUser() {
    const own = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
    if (!own) return;
    const store = readHiddenEndedStreamsStore();
    const values = Array.from(state.goLiveHiddenEndedAddresses)
      .map((v) => String(v || '').trim())
      .filter((v) => /^[0-9]+:[0-9a-f]{64}:.+/i.test(v))
      .slice(-300);
    if (values.length) store[own] = values;
    else delete store[own];
    try {
      localStorage.setItem(HIDDEN_ENDED_STREAMS_STORAGE_KEY, JSON.stringify(store));
    } catch (_) {
      // no-op
    }
  }

  function isFollowingPubkey(pubkey) {
    const normalized = normalizePubkeyHex(pubkey);
    return !!(normalized && state.followedPubkeys.has(normalized));
  }

  function setFollowingPubkey(pubkey, on) {
    const normalized = normalizePubkeyHex(pubkey);
    if (!normalized) return;
    if (on) state.followedPubkeys.add(normalized);
    else state.followedPubkeys.delete(normalized);
    persistFollowedPubkeys();
    renderFollowingCount();
  }

  function captureContactsMetadata(ev) {
    if (!ev || ev.kind !== KIND_CONTACTS) return false;
    const created = Number(ev.created_at || 0) || 0;
    if (created < (state.contactsLatestCreatedAt || 0)) return false;

    state.contactsLatestCreatedAt = created;
    state.contactsContent = typeof ev.content === 'string' ? ev.content : '';
    state.contactsPTagByPubkey = new Map();
    state.contactsOtherTags = [];

    (ev.tags || []).forEach((tag) => {
      if (!Array.isArray(tag) || !tag.length) return;
      if (tag[0] === 'p' && tag[1]) {
        const pk = normalizePubkeyHex(tag[1]);
        if (!pk) return;
        const cloned = [...tag];
        cloned[1] = pk;
        state.contactsPTagByPubkey.set(pk, cloned);
      } else {
        state.contactsOtherTags.push([...tag]);
      }
    });

    return true;
  }

  function buildContactsTagsFromFollowedSet() {
    const tags = [];
    (state.contactsOtherTags || []).forEach((t) => {
      if (!Array.isArray(t) || !t.length || t[0] === 'p') return;
      tags.push([...t]);
    });

    const followed = Array.from(state.followedPubkeys)
      .map((pk) => normalizePubkeyHex(pk))
      .filter(Boolean)
      .sort();

    followed.forEach((pk) => {
      const existing = state.contactsPTagByPubkey && state.contactsPTagByPubkey.get(pk);
      if (Array.isArray(existing) && existing.length >= 2 && existing[0] === 'p') {
        const cloned = [...existing];
        cloned[1] = pk;
        tags.push(cloned);
      } else {
        tags.push(['p', pk]);
      }
    });

    return tags;
  }

  async function publishFollowedPubkeysToNostr() {
    if (!state.user) throw new Error('Please login first to publish your follow list.');
    const tags = buildContactsTagsFromFollowedSet();
    const content = typeof state.contactsContent === 'string' ? state.contactsContent : '';
    const ev = await signAndPublish(KIND_CONTACTS, content, tags);
    captureContactsMetadata(ev);
    return ev;
  }

  function applySettingsToDocument() {
    document.body.classList.toggle('hide-nip05', !state.settings.showNip05Badges);
    document.body.classList.toggle('hide-zap-notices', !state.settings.showZapNotifications);
    document.body.classList.toggle('compact-chat', !!state.settings.compactChat);
    document.body.classList.toggle('no-chat-anim', !state.settings.animateZaps);
  }

  function renderSettingsRelayList() {
    const wrap = qs('#settingsRelayList2') || qs('#settingsRelayList');
    if (!wrap) return;
    wrap.innerHTML = '';

    state.settings.relays.forEach((relay) => {
      const tag = document.createElement('div');
      tag.className = 'relay-tag';
      tag.innerHTML = `${relay} <button class="rem" title="Remove">×</button>`;
      const btn = qs('.rem', tag);
      if (btn) btn.addEventListener('click', () => removeRelayFromSettings(relay));
      wrap.appendChild(tag);
    });
  }

  function removeRelayFromSettings(relay) {
    state.settings.relays = state.settings.relays.filter((r) => r !== relay);
    if (!state.settings.relays.length) state.settings.relays = [...DEFAULT_RELAYS];
    renderSettingsRelayList();
  }

  function addRelayToSettings(relay) {
    const clean = (relay || '').trim();
    if (!/^wss:\/\//i.test(clean)) {
      throw new Error('Relay URL must start with wss://');
    }
    if (!state.settings.relays.includes(clean)) state.settings.relays.push(clean);
    renderSettingsRelayList();
  }

  function setToggleById(id, isOn) {
    const el = qs(`#${id}`);
    if (!el) return;
    el.classList.toggle('on', !!isOn);
  }

  function isToggleOn(id) {
    const el = qs(`#${id}`);
    return !!(el && el.classList.contains('on'));
  }

  function populateSettingsModal() {
    renderSettingsRelayList();
    const lud16 = qs('#settingsLud16Input');
    const web = qs('#settingsWebsiteInput');
    const banner = qs('#settingsBannerInput');
    const displayName = qs('#settingsDisplayName');
    const username = qs('#settingsUsername');
    const about = qs('#settingsAbout');
    const avatarUrl = qs('#settingsAvatarUrl');
    const nip05 = qs('#settingsNip05Input');

    const up = state.user ? profileFor(state.user.pubkey) : null;
    if (lud16) lud16.value = (up && up.lud16) || state.settings.lud16 || '';
    if (web) web.value = (up && up.website) || state.settings.website || '';
    if (banner) banner.value = (up && up.banner) || state.settings.banner || '';
    if (displayName) displayName.value = (up && (up.display_name || up.name)) || '';
    if (username) username.value = (up && up.name) || '';
    if (about) about.value = (up && up.about) || '';
    if (avatarUrl) avatarUrl.value = (up && up.picture) || '';
    if (nip05) nip05.value = (up && up.nip05) || '';

    if (up && up.picture) previewSettingsAvatar(up.picture);

    setToggleById('setAutoPublishToggle', state.settings.autoPublish);
    setToggleById('setMiniPlayerToggle', state.settings.miniPlayer);
    setToggleById('setZapNoticeToggle', state.settings.showZapNotifications);
    setToggleById('setNip05Toggle', state.settings.showNip05Badges);
    setToggleById('setCompactToggle', state.settings.compactChat);
    setToggleById('setAnimateToggle', state.settings.animateZaps);
  }

  function collectSettingsFromModal() {
    const lud16 = qs('#settingsLud16Input');
    const web = qs('#settingsWebsiteInput');
    const banner = qs('#settingsBannerInput');

    return {
      ...state.settings,
      relays: [...state.settings.relays],
      autoPublish: isToggleOn('setAutoPublishToggle'),
      miniPlayer: isToggleOn('setMiniPlayerToggle'),
      showZapNotifications: isToggleOn('setZapNoticeToggle'),
      showNip05Badges: isToggleOn('setNip05Toggle'),
      compactChat: isToggleOn('setCompactToggle'),
      animateZaps: isToggleOn('setAnimateToggle'),
      lud16: (lud16 && lud16.value.trim()) || '',
      website: (web && web.value.trim()) || '',
      banner: (banner && banner.value.trim()) || ''
    };
  }

  function rebuildRelayPool() {
    if (state.pool) {
      try {
        state.pool.destroy();
      } catch (_) {
        // ignore
      }
    }

    state.pool = new RelayPool(state.relays, () => updateRelayBar());
    updateRelayBar();
    subscribeLive();

    if (state.selectedStreamAddress) {
      const current = state.streamsByAddress.get(state.selectedStreamAddress);
      if (current) subscribeChat(current);
    }

    if (state.selectedProfilePubkey) {
      subscribeProfileFeed(state.selectedProfilePubkey);
      subscribeProfileStats(state.selectedProfilePubkey);
    }

    if (state.relayPulseTimer) clearInterval(state.relayPulseTimer);
    state.relayPulseTimer = setInterval(updateRelayBar, 5000);
  }

  function applySettings(newSettings, opts = { reconnect: false }) {
    state.settings = { ...newSettings, relays: [...newSettings.relays] };
    state.relays = [...state.settings.relays];
    persistSettings();
    applySettingsToDocument();

    if (opts.reconnect) {
      rebuildRelayPool();
    }
  }

  function formatCount(n) {
    const v = Number(n || 0);
    if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return `${v}`;
  }

  function formatTimeAgo(ts) {
    const now = Math.floor(Date.now() / 1000);
    const d = Math.max(1, now - Number(ts || now));
    if (d < 60) return `${d}s`;
    if (d < 3600) return `${Math.floor(d / 60)}m`;
    if (d < 86400) return `${Math.floor(d / 3600)}h`;
    if (d < 604800) return `${Math.floor(d / 86400)}d`;
    return `${Math.floor(d / 604800)}w`;
  }


  function formatNostrAge(ts) {
    const start = Number(ts || 0);
    if (!start) return '-';
    const now = Math.floor(Date.now() / 1000);
    const seconds = Math.max(0, now - start);
    const days = Math.floor(seconds / 86400);
    if (days < 1) return 'less than a day';
    if (days < 30) return `${days} day${days === 1 ? '' : 's'}`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    if (!remMonths) return `${years} year${years === 1 ? '' : 's'}`;
    return `${years}y ${remMonths}mo`;
  }

  function estimateProfileFirstSeen(pubkey, profile) {
    let earliest = Number((profile && profile.created_at) || 0) || 0;

    const noteMap = state.profileNotesByPubkey.get(pubkey) || new Map();
    noteMap.forEach((ev) => {
      if (!ev || ev.pubkey !== pubkey) return;
      const ts = Number(ev.created_at || 0) || 0;
      if (ts && (!earliest || ts < earliest)) earliest = ts;
    });

    Array.from(state.streamsByAddress.values())
      .filter((s) => s.pubkey === pubkey)
      .forEach((s) => {
        const ts = Number(s.created_at || 0) || 0;
        if (ts && (!earliest || ts < earliest)) earliest = ts;
      });

    return earliest;
  }
  function parseNpubMaybe(input) {
    const val = (input || '').trim();
    if (!val || !val.startsWith('npub1')) return '';
    if (!window.NostrTools || !window.NostrTools.nip19) return '';
    try {
      const dec = window.NostrTools.nip19.decode(val);
      if (dec && dec.type === 'npub') return dec.data;
    } catch (_) {
      return '';
    }
    return '';
  }

  function formatNpubForDisplay(pubkeyOrNpub) {
    const raw = (pubkeyOrNpub || '').trim();
    if (!raw) return '';
    if (raw.startsWith('npub1')) return raw;
    if (!/^[0-9a-f]{64}$/i.test(raw)) return raw;
    if (!window.NostrTools || !window.NostrTools.nip19 || typeof window.NostrTools.nip19.npubEncode !== 'function') {
      return shortHex(raw);
    }
    try {
      return window.NostrTools.nip19.npubEncode(raw);
    } catch (_) {
      return shortHex(raw);
    }
  }

  function parseTags(tags) {
    const map = new Map();
    tags.forEach((t) => {
      if (Array.isArray(t) && t.length > 1) {
        const key = t[0];
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(t.slice(1));
      }
    });
    return map;
  }

  function firstTag(map, key) {
    const vals = map.get(key);
    if (!vals || vals.length === 0) return '';
    return vals[0][0] || '';
  }

  function parseLiveEvent(ev) {
    const tagMap = parseTags(ev.tags || []);
    const d = firstTag(tagMap, 'd') || ev.id.slice(0, 12);
    const status = (firstTag(tagMap, 'status') || 'live').toLowerCase();
    // NIP-53 address always uses the event publisher's pubkey
    const address = `${KIND_LIVE_EVENT}:${ev.pubkey}:${d}`;
    const starts = Number(firstTag(tagMap, 'starts') || 0) || null;
    const title = firstTag(tagMap, 'title') || (ev.content || '').slice(0, 90) || 'Untitled stream';
    const summary = firstTag(tagMap, 'summary') || ev.content || '';
    const image = sanitizeMediaUrl(firstTag(tagMap, 'image') || firstTag(tagMap, 'thumb') || '');
    const streaming = sanitizeMediaUrl(firstTag(tagMap, 'streaming') || firstTag(tagMap, 'url') || '');
    const participants = Number(firstTag(tagMap, 'current_participants') || 0) || 0;

    // NIP-53: platforms (zap.stream, shosho, etc.) publish under their own key
    // but embed the real streamer as ["p", "<pubkey>", "<relay>", "host"].
    let hostPubkey = ev.pubkey;
    const platformPubkey_ref = { val: null };
    for (const t of (ev.tags || [])) {
      if (t[0] === 'p' && t[1] && /^[0-9a-f]{64}$/i.test(t[1])) {
        const role = (t[3] || t[2] || '').toLowerCase().trim();
        if (role === 'host' || role === 'streamer') {
          hostPubkey = t[1];
          platformPubkey_ref.val = ev.pubkey;
          break;
        }
      }
    }
    const platformPubkey = platformPubkey_ref.val;

    return {
      id: ev.id,
      pubkey: ev.pubkey,     // event publisher (used for NIP-53 address & ownership)
      hostPubkey,            // actual streamer for display (equals pubkey when self-published)
      platformPubkey,        // non-null when a platform published on behalf of the streamer
      created_at: ev.created_at,
      kind: ev.kind,
      d,
      address,
      status,
      title,
      summary,
      image,
      streaming,
      starts,
      participants,
      raw: ev
    };
  }

  function isHomePath(pathname) {
    const raw = (pathname || '/').trim();
    const normalized = raw === '' ? '/' : (raw.replace(/\/+$/, '') || '/');
    return normalized === '/' || normalized.toLowerCase() === '/index.html';
  }

  function restoreRouteFromSpaFallbackQuery() {
    if (!window.location || !window.history || !window.history.replaceState) return;
    let params = null;
    try {
      params = new URLSearchParams(window.location.search || '');
    } catch (_) {
      return;
    }
    const encoded = params.get('__sifaka_route');
    if (!encoded) return;

    let rawTarget = encoded;
    try {
      rawTarget = decodeURIComponent(encoded);
    } catch (_) {
      rawTarget = encoded;
    }

    let target = String(rawTarget || '').trim();
    if (!target) return;
    if (/^https?:\/\//i.test(target)) {
      try {
        const u = new URL(target);
        target = `${u.pathname || '/'}${u.search || ''}${u.hash || ''}`;
      } catch (_) {
        // keep parsed target as-is
      }
    }

    let hash = '';
    const hashIdx = target.indexOf('#');
    if (hashIdx >= 0) {
      hash = target.slice(hashIdx);
      target = target.slice(0, hashIdx);
    }
    let search = '';
    const searchIdx = target.indexOf('?');
    if (searchIdx >= 0) {
      search = target.slice(searchIdx);
      target = target.slice(0, searchIdx);
    }
    if (!target.startsWith('/')) target = `/${target}`;

    const finalTarget = `${target}${search}${hash}`;
    try {
      window.history.replaceState(window.history.state || {}, '', finalTarget);
    } catch (_) {
      // ignore
    }
  }

  function decodePathPart(part) {
    try {
      return decodeURIComponent(part || '');
    } catch (_) {
      return part || '';
    }
  }

  function pathParts(pathname) {
    return (pathname || '').split('/').filter(Boolean).map((p) => decodePathPart(p).trim());
  }

  function extractNaddrFromPath(pathname) {
    const parts = pathParts(pathname);
    if (!parts.length) return '';
    const candidate = parts[0].toLowerCase() === 'a' && parts[1] ? parts[1] : parts[0];
    const naddr = (candidate || '').trim().toLowerCase();
    return /^naddr1[023456789acdefghjklmnpqrstuvwxyz]+$/.test(naddr) ? naddr : '';
  }

  function normalizeNip05Value(value) {
    const raw = (value || '').trim().toLowerCase();
    if (!raw || raw.includes('/')) return '';
    const parts = raw.split('@');
    if (parts.length !== 2) return '';
    const localPart = (parts[0] || '').trim();
    const domain = (parts[1] || '').trim();
    if (!localPart || !domain || !domain.includes('.')) return '';
    if (!/^[a-z0-9._-]+$/i.test(localPart)) return '';
    if (!/^[a-z0-9.-]+$/i.test(domain)) return '';
    return `${localPart}@${domain}`;
  }

  function nip05EntryForPubkey(pubkey, nip05Value) {
    const key = normalizePubkeyHex(pubkey);
    const nip05 = normalizeNip05Value(nip05Value);
    if (!key || !nip05) return null;
    const row = state.nip05VerificationByPubkey.get(key);
    if (!row || row.nip05 !== nip05) return null;
    return row;
  }

  function getVerifiedNip05ForPubkey(pubkey, nip05Value) {
    const nip05 = normalizeNip05Value(nip05Value);
    const row = nip05EntryForPubkey(pubkey, nip05);
    return row && row.verified ? nip05 : '';
  }

  function normalizeNip05ResolvedPubkey(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const asHex = normalizePubkeyHex(raw);
    if (asHex) return asHex;
    const lower = raw.toLowerCase();
    if (/^npub1[023456789acdefghjklmnpqrstuvwxyz]+$/.test(lower)) {
      return normalizePubkeyHex(parseNpubMaybe(lower));
    }
    return '';
  }

  function pickNip05NameMatch(names, localPart) {
    if (!names || typeof names !== 'object') return '';
    const wanted = String(localPart || '').trim();
    if (!wanted) return '';
    if (names[wanted]) return names[wanted];
    const lowerWanted = wanted.toLowerCase();
    if (names[lowerWanted]) return names[lowerWanted];
    const matchKey = Object.keys(names).find((k) => String(k || '').trim().toLowerCase() === lowerWanted);
    return matchKey ? names[matchKey] : '';
  }

  function refreshNip05DependentUi(pubkey) {
    const normalized = normalizePubkeyHex(pubkey);
    if (!normalized) return;
    renderLiveGrid();

    const selected = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
    if (selected) {
      const isRelated = [selected.pubkey, selected.hostPubkey, selected.platformPubkey]
        .map((v) => normalizePubkeyHex(v))
        .includes(normalized);
      if (isRelated) renderVideo(selected);
    }

    if (state.user && normalizePubkeyHex(state.user.pubkey) === normalized) {
      setUserUi();
    }

    if (normalizePubkeyHex(state.selectedProfilePubkey) === normalized) {
      renderProfilePage(normalized);
      syncProfileRoute(normalized, 'replace');
    }

    const chatEl = qs('#chatScroll');
    if (chatEl) {
      const verified = !!getVerifiedNip05ForPubkey(normalized, profileFor(normalized).nip05 || '');
      const escaped = (window.CSS && typeof window.CSS.escape === 'function')
        ? window.CSS.escape(normalized)
        : normalized.replace(/["\\]/g, '');
      chatEl.querySelectorAll(`.cmsg[data-pubkey="${escaped}"] .c-av`).forEach((el) => {
        el.classList.toggle('nip05-square', verified);
      });
    }
  }

  async function fetchNip05PubkeyFromWellKnown(nip05Input, opts = {}) {
    const normalized = normalizeNip05Value(nip05Input);
    if (!normalized) return '';
    const now = Date.now();
    const cached = state.nip05LookupCacheByNip05.get(normalized);
    const maxAge = Number(opts.maxAgeMs || NIP05_LOOKUP_CACHE_TTL_MS);
    if (!opts.force && cached) {
      const age = now - Number(cached.checkedAt || 0);
      const cachedType = String(cached.resultType || (cached.pubkey ? 'hit' : 'miss'));
      const ttl = cachedType === 'error'
        ? NIP05_LOOKUP_ERROR_CACHE_TTL_MS
        : (cachedType === 'miss' ? Math.min(maxAge, NIP05_LOOKUP_MISS_CACHE_TTL_MS) : maxAge);
      if (age < ttl) return normalizeNip05ResolvedPubkey(cached.pubkey || '');
    }

    const [localPart, domain] = normalized.split('@');
    const urls = [
      `https://${domain}/.well-known/nostr.json?name=${encodeURIComponent(localPart)}`,
      `https://${domain}/.well-known/nostr.json`
    ];

    let hadResponse = false;
    let hadNetworkError = false;
    let resolved = '';
    for (let i = 0; i < urls.length && !resolved; i += 1) {
      try {
        const resp = await fetch(urls[i], { cache: 'no-store' });
        hadResponse = true;
        if (!resp.ok) continue;

        let data = null;
        try {
          data = await resp.json();
        } catch (_) {
          continue;
        }

        const names = data && data.names && typeof data.names === 'object' ? data.names : {};
        const candidate = pickNip05NameMatch(names, localPart);
        resolved = normalizeNip05ResolvedPubkey(candidate || '');
      } catch (_) {
        hadNetworkError = true;
      }
    }

    const resultType = resolved ? 'hit' : ((hadNetworkError && !hadResponse) ? 'error' : 'miss');
    state.nip05LookupCacheByNip05.set(normalized, { pubkey: resolved, checkedAt: now, resultType });
    return resolved;
  }

  async function ensureNip05Verification(pubkey, nip05Input, opts = {}) {
    const key = normalizePubkeyHex(pubkey);
    const nip05 = normalizeNip05Value(nip05Input);
    if (!key) return false;
    if (!nip05) {
      const prev = state.nip05VerificationByPubkey.get(key);
      state.nip05VerificationByPubkey.delete(key);
      if (prev) refreshNip05DependentUi(key);
      return false;
    }

    const existing = nip05EntryForPubkey(key, nip05);
    const maxAge = Number(opts.maxAgeMs || NIP05_LOOKUP_CACHE_TTL_MS);
    const existingTtl = existing
      ? (existing.verified ? maxAge : Math.min(maxAge, NIP05_UNVERIFIED_CACHE_TTL_MS))
      : 0;
    const existingFresh = existing && (Date.now() - Number(existing.checkedAt || 0)) < existingTtl;
    if (!opts.force && existingFresh) return !!existing.verified;
    if (state.nip05VerificationPendingByPubkey.has(key)) return !!(existing && existing.verified);

    state.nip05VerificationPendingByPubkey.add(key);
    try {
      const resolved = await fetchNip05PubkeyFromWellKnown(nip05, opts);
      const verified = !!resolved && resolved === key;
      const prev = state.nip05VerificationByPubkey.get(key);
      const changed = !prev || prev.nip05 !== nip05 || !!prev.verified !== verified;
      state.nip05VerificationByPubkey.set(key, { nip05, verified, checkedAt: Date.now() });
      if (changed) refreshNip05DependentUi(key);
      return verified;
    } finally {
      state.nip05VerificationPendingByPubkey.delete(key);
    }
  }

  function extractProfileTokenFromPath(pathname) {
    const parts = pathParts(pathname);
    if (!parts.length) return '';
    if (parts[0].toLowerCase() === 'a') return '';
    const token = parts[0];
    const lower = token.toLowerCase();
    if (/^npub1[023456789acdefghjklmnpqrstuvwxyz]+$/.test(lower)) return lower;
    const nip05 = normalizeNip05Value(token);
    if (nip05) return nip05;
    return '';
  }

  function encodeStreamNaddr(stream) {
    if (!stream || !window.NostrTools || !window.NostrTools.nip19 || typeof window.NostrTools.nip19.naddrEncode !== 'function') {
      return '';
    }
    try {
      return window.NostrTools.nip19.naddrEncode({
        kind: Number(stream.kind || KIND_LIVE_EVENT),
        pubkey: stream.pubkey,
        identifier: stream.d,
        relays: state.relays.slice(0, 3)
      });
    } catch (_) {
      return '';
    }
  }

  async function decodeNaddrToAddress(naddr) {
    const value = (naddr || '').trim().toLowerCase();
    if (!value) return '';
    try {
      const tools = await ensureNostrTools();
      if (!tools || !tools.nip19 || typeof tools.nip19.decode !== 'function') return '';
      const decoded = tools.nip19.decode(value);
      if (!decoded || decoded.type !== 'naddr' || !decoded.data) return '';
      const kind = Number(decoded.data.kind || KIND_LIVE_EVENT);
      const pubkey = (decoded.data.pubkey || '').toLowerCase();
      const identifier = (decoded.data.identifier || '').trim();
      if (!pubkey || !identifier) return '';
      return `${kind}:${pubkey}:${identifier}`;
    } catch (_) {
      return '';
    }
  }

  async function decodeNpubToPubkey(npub) {
    const value = (npub || '').trim().toLowerCase();
    if (!/^npub1[023456789acdefghjklmnpqrstuvwxyz]+$/.test(value)) return '';
    try {
      const tools = await ensureNostrTools();
      if (!tools || !tools.nip19 || typeof tools.nip19.decode !== 'function') return '';
      const decoded = tools.nip19.decode(value);
      if (!decoded || decoded.type !== 'npub') return '';
      return /^[0-9a-f]{64}$/i.test(decoded.data || '') ? decoded.data.toLowerCase() : '';
    } catch (_) {
      return '';
    }
  }

  async function resolveNip05ToPubkey(nip05) {
    const normalized = normalizeNip05Value(nip05);
    if (!normalized) return '';
    const resolved = await fetchNip05PubkeyFromWellKnown(normalized);
    if (!resolved) return '';

    const existing = profileFor(resolved);
    const existingNip05 = normalizeNip05Value(existing.nip05 || '');
    if (existingNip05 === normalized) {
      state.nip05VerificationByPubkey.set(resolved, { nip05: normalized, verified: true, checkedAt: Date.now() });
    }
    return resolved;
  }

  async function resolveProfileTokenToPubkey(token) {
    const value = (token || '').trim();
    if (!value) return '';
    const lower = value.toLowerCase();
    if (/^npub1[023456789acdefghjklmnpqrstuvwxyz]+$/.test(lower)) {
      return decodeNpubToPubkey(lower);
    }
    const nip05 = normalizeNip05Value(value);
    if (nip05) return resolveNip05ToPubkey(nip05);
    return '';
  }

  function syncHomeRoute(mode = 'push') {
    if (!window.history || !window.history.pushState) return;
    if (isHomePath(window.location.pathname)) return;
    const method = mode === 'replace' ? 'replaceState' : 'pushState';
    try {
      window.history[method]({ view: 'home' }, '', '/');
    } catch (_) {
      // ignore
    }
  }

  function syncTheaterRoute(stream, mode = 'push') {
    if (!stream || !window.history || !window.history.pushState) return;

    const applyRoute = (naddr) => {
      const val = (naddr || '').trim().toLowerCase();
      if (!val) return false;
      const targetPath = `/${val}`;
      if (window.location.pathname === targetPath) return true;
      const method = mode === 'replace' ? 'replaceState' : 'pushState';
      try {
        window.history[method]({ view: 'theater', address: stream.address, naddr: val }, '', targetPath);
        return true;
      } catch (_) {
        return false;
      }
    };

    if (applyRoute(encodeStreamNaddr(stream))) return;
    ensureNostrTools().then(() => {
      applyRoute(encodeStreamNaddr(stream));
    }).catch(() => {});
  }

  function syncProfileRoute(pubkey, mode = 'push') {
    if (!pubkey || !window.history || !window.history.pushState) return;

    const applyRoute = (path) => {
      const targetPath = (path || '').trim();
      if (!targetPath) return false;
      if (window.location.pathname === targetPath) return true;
      const method = mode === 'replace' ? 'replaceState' : 'pushState';
      try {
        window.history[method]({ view: 'profile', pubkey }, '', targetPath);
        return true;
      } catch (_) {
        return false;
      }
    };

    const profile = profileFor(pubkey);
    const nip05 = getVerifiedNip05ForPubkey(pubkey, profile.nip05 || '');
    if (nip05 && applyRoute(`/${nip05}`)) return;
    if (!nip05) ensureNip05Verification(pubkey, profile.nip05 || '').catch(() => {});

    const applyNpub = () => {
      if (!window.NostrTools || !window.NostrTools.nip19 || typeof window.NostrTools.nip19.npubEncode !== 'function') {
        return false;
      }
      try {
        const npub = window.NostrTools.nip19.npubEncode(pubkey);
        return applyRoute(`/${(npub || '').toLowerCase()}`);
      } catch (_) {
        return false;
      }
    };

    if (applyNpub()) return;
    ensureNostrTools().then(() => {
      const latest = profileFor(pubkey);
      const latestNip05 = getVerifiedNip05ForPubkey(pubkey, latest.nip05 || '');
      if (latestNip05) {
        applyRoute(`/${latestNip05}`);
        return;
      }
      applyNpub();
    }).catch(() => {});
  }

  function tryOpenPendingRouteStream() {
    if (!state.pendingRouteAddress) return false;
    const stream = state.streamsByAddress.get(state.pendingRouteAddress);
    if (!stream) return false;
    const address = state.pendingRouteAddress;
    state.pendingRouteAddress = '';
    state.pendingRouteNaddr = '';
    openStream(address, { routeMode: 'skip' });
    return true;
  }

  function showHomeFromRoute() {
    if (window.showPage) window.showPage('home', { routeMode: 'skip' });
  }

  async function syncViewFromLocation(opts = {}) {
    const fallbackMode = opts.fallbackMode || 'replace';
    const naddr = extractNaddrFromPath(window.location.pathname);
    if (naddr) {
      state.pendingRouteNaddr = naddr;
      if (window.showVideoPage) window.showVideoPage({ routeMode: 'skip' });
      const address = await decodeNaddrToAddress(naddr);
      if (!address) {
        state.pendingRouteAddress = '';
        state.pendingRouteNaddr = '';
        if (fallbackMode !== 'skip' && !isHomePath(window.location.pathname)) syncHomeRoute(fallbackMode);
        showHomeFromRoute();
        return;
      }
      state.pendingRouteAddress = address;
      tryOpenPendingRouteStream();
      return;
    }

    state.pendingRouteAddress = '';
    state.pendingRouteNaddr = '';

    const profileToken = extractProfileTokenFromPath(window.location.pathname);
    if (profileToken) {
      const pubkey = await resolveProfileTokenToPubkey(profileToken);
      if (!pubkey) {
        if (fallbackMode !== 'skip' && !isHomePath(window.location.pathname)) syncHomeRoute(fallbackMode);
        showHomeFromRoute();
        return;
      }
      showProfileByPubkey(pubkey, { routeMode: 'skip' });
      return;
    }

    if (!isHomePath(window.location.pathname) && fallbackMode !== 'skip') syncHomeRoute(fallbackMode);
    showHomeFromRoute();
  }

  function parseProfile(ev) {
    let obj = {};
    try {
      obj = JSON.parse(ev.content || '{}');
    } catch (_) {
      obj = {};
    }
    return {
      pubkey: ev.pubkey,
      created_at: ev.created_at || 0,
      name: obj.display_name || obj.name || shortHex(ev.pubkey),
      display_name: obj.display_name || '',
      username: obj.name || '',
      about: obj.about || '',
      picture: obj.picture || '',
      banner: obj.banner || '',
      website: obj.website || '',
      nip05: normalizeNip05Value(obj.nip05 || ''),
      lud16: obj.lud16 || '',
      twitter: obj.twitter || obj.x || '',
      github: obj.github || ''
    };
  }

  function parseKind30315StatusContent(ev) {
    if (!ev || Number(ev.kind || 0) !== KIND_PROFILE_STATUS) return '';
    return String(ev.content || '').trim().slice(0, 180);
  }

  function pickProfileStatusCandidate(pubkey, bestGeneral, bestAny) {
    const key = normalizePubkeyHex(pubkey);
    if (!key) return null;
    const candidate = bestGeneral || bestAny || null;
    if (!candidate) return null;
    if (normalizePubkeyHex(candidate.pubkey) !== key) return null;
    return candidate;
  }

  function renderProfileKind30315(pubkey) {
    const key = normalizePubkeyHex(pubkey);
    const row = qs('#profKind30315Row');
    const val = qs('#profKind30315');
    const editRow = qs('#profKind30315Edit');
    const input = qs('#profKind30315Input');
    const saveBtn = qs('#profKind30315SaveBtn');

    const entry = key ? state.profileStatusByPubkey.get(key) : null;
    const statusText = (entry && entry.text ? String(entry.text) : '').trim();
    if (row) row.style.display = (key && statusText) ? 'flex' : 'none';
    if (val) val.textContent = statusText;

    const own = !!(key && state.user && normalizePubkeyHex(state.user.pubkey) === key);
    if (editRow) editRow.style.display = own ? 'flex' : 'none';
    if (input) {
      if (document.activeElement !== input) input.value = statusText;
      input.placeholder = 'Set status';
    }
    if (saveBtn) saveBtn.disabled = !own || !!state.profileStatusSavePending;
  }

  function getProfileStatusText(pubkey) {
    const key = normalizePubkeyHex(pubkey);
    if (!key) return '';
    const entry = state.profileStatusByPubkey.get(key);
    return entry && entry.text ? String(entry.text).trim() : '';
  }

  function subscribeProfileStatus(pubkey) {
    const key = normalizePubkeyHex(pubkey);
    if (state.profileStatusSubId && state.pool) {
      state.pool.unsubscribe(state.profileStatusSubId);
    }
    state.profileStatusSubId = null;
    if (!key || !state.pool) {
      renderProfileKind30315('');
      return;
    }

    let bestGeneral = null;
    let bestAny = null;
    const applyBest = () => {
      const candidate = pickProfileStatusCandidate(key, bestGeneral, bestAny);
      if (candidate) {
        state.profileStatusByPubkey.set(key, {
          text: parseKind30315StatusContent(candidate),
          created_at: Number(candidate.created_at || 0),
          id: candidate.id || ''
        });
      } else if (!state.profileStatusByPubkey.has(key)) {
        state.profileStatusByPubkey.set(key, { text: '', created_at: 0, id: '' });
      }
      if (normalizePubkeyHex(state.selectedProfilePubkey) === key) {
        renderProfileKind30315(key);
        renderProfileFeed(key);
      }
    };

    state.profileStatusSubId = state.pool.subscribe(
      [
        { kinds: [KIND_PROFILE_STATUS], authors: [key], '#d': ['general'], limit: 20 },
        { kinds: [KIND_PROFILE_STATUS], authors: [key], limit: 20 }
      ],
      {
        event: (ev) => {
          if (!ev || Number(ev.kind || 0) !== KIND_PROFILE_STATUS) return;
          if (normalizePubkeyHex(ev.pubkey) !== key) return;
          const ts = Number(ev.created_at || 0);
          if (!bestAny || ts >= Number(bestAny.created_at || 0)) bestAny = ev;
          const d = String(firstTagValue(ev.tags, 'd') || '').trim().toLowerCase();
          if ((d === 'general' || !d) && (!bestGeneral || ts >= Number(bestGeneral.created_at || 0))) {
            bestGeneral = ev;
          }
          applyBest();
        },
        eose: () => {
          applyBest();
        }
      }
    );
  }

  async function signAndPublish(kind, content, tags) {
    if (!state.user) {
      throw new Error('You are in read-only mode. Login to publish.');
    }

    const createdAt = Math.floor(Date.now() / 1000);
    const unsigned = {
      kind,
      created_at: createdAt,
      tags,
      content
    };

    let signed;

    if (state.authMode === 'nip07') {
      if (!window.nostr) throw new Error('NIP-07 signer not available.');
      const nip07Payload = { ...unsigned, pubkey: state.user.pubkey };
      if (typeof window.nostr.signEvent === 'function') {
        signed = await window.nostr.signEvent(nip07Payload);
      } else if (typeof window.nostr.finalizeEvent === 'function') {
        signed = await window.nostr.finalizeEvent(nip07Payload);
      } else {
        throw new Error('Signer does not support signEvent/finalizeEvent.');
      }
    } else if (state.authMode === 'local') {
      const tools = await ensureNostrTools();
      const secret = normalizeSecretKey(state.localSecretKey);
      if (typeof tools.finalizeEvent === 'function') {
        signed = tools.finalizeEvent(unsigned, secret);
      } else {
        const legacy = { ...unsigned, pubkey: tools.getPublicKey(secret) };
        if (typeof tools.getEventHash === 'function') legacy.id = tools.getEventHash(legacy);
        if (typeof tools.signEvent === 'function') {
          legacy.sig = tools.signEvent(legacy, bytesToHex(secret));
        }
        signed = legacy;
      }
    } else {
      throw new Error('You are in read-only mode. Login with extension or nsec key first.');
    }

    const sent = state.pool.publish(signed);
    if (sent === 0) throw new Error('No relay connections are currently open.');
    return signed;
  }

  function updateRelayBar() {
    const bar = qs('#relayBar');
    if (!bar || !state.pool) return;
    let open = 0;
    state.pool.sockets.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) open += 1;
    });
    bar.textContent = `Connected relays: ${open}/${state.relays.length} (${state.relays.join(' | ')})`;
  }

  function upsertStream(stream) {
    const existing = state.streamsByAddress.get(stream.address);
    if (!existing || existing.created_at <= stream.created_at) {
      state.streamsByAddress.set(stream.address, stream);
    }
    if (state.selectedStreamAddress === stream.address) {
      const selected = state.streamsByAddress.get(stream.address) || stream;
      const status = normalizeStreamStatus(selected.status);
      const ownPubkey = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
      const streamPubkey = normalizePubkeyHex(selected.pubkey);
      const isOwnStream = !!ownPubkey && ownPubkey === streamPubkey;
      const videoPage = qs('#videoPage');
      const isWatchingSelected = state.activeViewerAddress === selected.address
        || !!(videoPage && videoPage.style.display !== 'none');

      if (status === 'ended' && !isOwnStream && isWatchingSelected) {
        setActiveViewerAddress('');
        if (window.showPage) window.showPage('home');
      } else if (isWatchingSelected || isOwnStream) {
        renderVideo(selected);
      }
    }
    updateGoLiveButtonState();
  }

  function normalizeStreamStatus(status) {
    const raw = String(status || '').toLowerCase();
    if (raw.includes('ended')) return 'ended';
    if (raw.includes('planned')) return 'planned';
    return 'live';
  }

  function ownManageableStreams() {
    if (!state.user) return [];
    const own = normalizePubkeyHex(state.user.pubkey);
    if (!own) return [];
    return Array.from(state.streamsByAddress.values())
      .filter((s) => normalizePubkeyHex(s.pubkey) === own)
      .filter((s) => !state.goLiveHiddenEndedAddresses.has(s.address))
      .sort((a, b) => {
        const rank = (stream) => {
          const st = normalizeStreamStatus(stream.status);
          if (st === 'live') return 0;
          if (st === 'planned') return 1;
          return 2;
        };
        const r = rank(a) - rank(b);
        if (r) return r;
        return (b.created_at || 0) - (a.created_at || 0);
      });
  }

  function setGoLiveStatusSelection(statusValue) {
    const normalized = normalizeStreamStatus(statusValue);
    const row = qs('.srow');
    if (!row) return;
    const buttons = qsa('.sc', row);
    buttons.forEach((btn) => btn.classList.remove('sl'));
    const target = buttons.find((btn) => normalizeStreamStatus(btn.textContent) === normalized) || buttons[0];
    if (target) target.classList.add('sl');
  }

  function populateGoLiveFormFromStream(stream) {
    const dTagInput = qs('#goLiveDTag');
    const titleInput = qs('#goLiveTitle');
    const summaryInput = qs('#goLiveSummary');
    const streamUrlInput = qs('#goLiveStreamUrl');
    const thumbInput = qs('#goLiveThumb');
    const startsInput = qs('#goLiveStarts');
    const eventIdInput = qs('#goLiveEventId');

    if (dTagInput) dTagInput.value = stream ? (stream.d || '') : '';
    if (titleInput) titleInput.value = stream ? (stream.title || '') : '';
    if (summaryInput) summaryInput.value = stream ? (stream.summary || '') : '';
    if (streamUrlInput) streamUrlInput.value = stream ? (stream.streaming || '') : '';
    if (thumbInput) thumbInput.value = stream ? (stream.image || '') : '';
    if (startsInput) startsInput.value = stream && stream.starts ? fromUnixSeconds(stream.starts) : '';
    if (eventIdInput) eventIdInput.value = stream && stream.id ? stream.id : '';
    setGoLiveStatusSelection(stream ? stream.status : 'live');
  }

  function resetGoLiveFormDefaults() {
    populateGoLiveFormFromStream(null);
    const dtag = qs('#goLiveDTag');
    if (dtag && !dtag.value.trim()) dtag.value = `stream-${Date.now()}`;
    const starts = qs('#goLiveStarts');
    if (starts && !starts.value) starts.value = fromUnixSeconds(Math.floor(Date.now() / 1000));
    const title = qs('#goLiveTitle');
    if (title && !title.value.trim()) title.value = 'Untitled stream';
  }

  function updateGoLiveModalState() {
    const manageWrap = qs('#goLiveManageWrap');
    const manageHint = qs('#goLiveManageHint');
    const selector = qs('#goLiveStreamSelect');
    const publishBtn = qs('#goLivePublishBtn');
    const removeBtn = qs('#goLiveRemoveBtn');
    const modalTitle = qs('#goLiveModalTitle');
    const modalSub = qs('#goLiveModalSub');

    const streams = ownManageableStreams();
    let selected = streams.find((s) => s.address === state.goLiveSelectedAddress) || null;
    if (!selected && streams.length) selected = streams[0];
    state.goLiveSelectedAddress = selected ? selected.address : '';

    if (manageWrap) manageWrap.classList.toggle('on', streams.length > 0);
    if (selector) {
      selector.innerHTML = '';
      streams.forEach((stream) => {
        const opt = document.createElement('option');
        const statusLabel = normalizeStreamStatus(stream.status).toUpperCase();
        const title = (stream.title || 'Untitled stream').slice(0, 64);
        opt.value = stream.address;
        opt.textContent = `${statusLabel} - ${title}`;
        selector.appendChild(opt);
      });
      if (state.goLiveSelectedAddress) selector.value = state.goLiveSelectedAddress;
    }

    if (selected) {
      populateGoLiveFormFromStream(selected);
      const status = normalizeStreamStatus(selected.status);
      if (modalTitle) modalTitle.innerHTML = '<span class="mi"></span>Edit Stream';
      if (modalSub) modalSub.textContent = 'You already have stream events. Edit details and publish updates.';
      if (publishBtn) publishBtn.textContent = status === 'live' ? 'Save Live Update' : 'Save Stream Update';
      if (removeBtn) removeBtn.style.display = status === 'ended' ? 'inline-flex' : 'none';
      if (manageHint) manageHint.textContent = streams.length > 1
        ? 'Pick a stream from the list to edit or end it.'
        : 'You can edit title, stream id, URL, summary, and status.';
    } else {
      resetGoLiveFormDefaults();
      if (modalTitle) modalTitle.innerHTML = '<span class="mi"></span>Publish Your Stream';
      if (modalSub) modalSub.innerHTML = 'Broadcasts a <span style="color:var(--purple);font-family:\'DM Mono\',monospace">kind:30311</span> NIP-53 event to your relays.';
      if (publishBtn) publishBtn.textContent = 'Go Live Now';
      if (removeBtn) removeBtn.style.display = 'none';
      if (manageHint) manageHint.textContent = 'Create your first stream event, then it will appear here for editing.';
    }
  }

  function updateGoLiveButtonState() {
    const btn = qs('#goLiveBtn');
    if (!btn) return;
    const streams = ownManageableStreams();
    const hasLive = streams.some((s) => normalizeStreamStatus(s.status) === 'live');
    if (hasLive) {
      btn.textContent = 'Edit Stream';
      btn.classList.remove('btn-ghost');
      btn.classList.add('btn-live-pulse', 'btn-edit-stream-live');
      return;
    }
    btn.textContent = 'Go Live';
    btn.classList.remove('btn-live-pulse', 'btn-edit-stream-live');
    btn.classList.add('btn-ghost');
  }

  function effectiveParticipants(stream) {
    if (!stream) return 0;
    const base = Number(stream.participants || 0) || 0;
    const watchingBoost = (
      (state.activeViewerAddress && stream.address === state.activeViewerAddress)
      || (state.activeHeroViewerAddress && stream.address === state.activeHeroViewerAddress)
    ) ? 1 : 0;
    return Math.max(0, base + watchingBoost);
  }

  function refreshParticipantDependentUi() {
    renderLiveGrid();

    const featured = heroFeaturedStreams();
    if (featured.length) {
      let idx = Math.min(Math.max(0, state.featuredIndex), featured.length - 1);
      if (state.featuredCurrentAddress) {
        const currentIdx = featured.findIndex((s) => s.address === state.featuredCurrentAddress);
        if (currentIdx >= 0) idx = currentIdx;
      }
      state.featuredIndex = idx;
      renderHeroIndicators(featured, idx);
      const heroViewers = qs('#heroViewers');
      if (heroViewers) {
        const viewerCount = effectiveParticipants(featured[idx]);
        heroViewers.textContent = viewerCount > 0 ? viewerCount.toLocaleString() : '-';
      }
    }

    const selected = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
    if (selected) {
      const viewers = qs('#theaterViewers');
      if (viewers) viewers.textContent = formatCount(effectiveParticipants(selected));
    }

    if (window.renderRecoStreams) window.renderRecoStreams();
  }

  function setActiveViewerAddress(address) {
    const next = (address || '').trim();
    if (state.activeViewerAddress === next) return;
    state.activeViewerAddress = next;
    refreshParticipantDependentUi();
  }

  function setActiveHeroViewerAddress(address) {
    const next = (address || '').trim();
    if (state.activeHeroViewerAddress === next) return;
    state.activeHeroViewerAddress = next;
    refreshParticipantDependentUi();
  }

  function sortedLiveStreams() {
    return Array.from(state.streamsByAddress.values())
      .filter((s) => s.status !== 'ended')
      .sort((a, b) => {
        // Tier 1: has viewers > 0  â†’  Tier 2: has streaming URL but 0 viewers  â†’  Tier 3: no URL no viewers
        const tierA = effectiveParticipants(a) > 0 ? 0 : (a.streaming ? 1 : 2);
        const tierB = effectiveParticipants(b) > 0 ? 0 : (b.streaming ? 1 : 2);
        if (tierA !== tierB) return tierA - tierB;
        // Within same tier: higher viewers first
        return effectiveParticipants(b) - effectiveParticipants(a);
      });
  }

  function profileFor(pubkey) {
    return state.profilesByPubkey.get(pubkey) || {
      pubkey,
      name: shortHex(pubkey),
      about: '',
      picture: '',
      banner: '',
      website: '',
      nip05: '',
      lud16: '',
      twitter: '',
      github: ''
    };
  }

  /* =====================================================================
     NIP-51 PEOPLE LISTS + FOLLOWING LIVE SECTION
     ===================================================================== */

  function loadSavedExternalLists() {
    try {
      const raw = localStorage.getItem(SAVED_LISTS_STORAGE_KEY);
      state.savedExternalLists = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(state.savedExternalLists)) state.savedExternalLists = [];
    } catch (_) {
      state.savedExternalLists = [];
    }
  }

  function persistSavedExternalLists() {
    try {
      localStorage.setItem(SAVED_LISTS_STORAGE_KEY, JSON.stringify(state.savedExternalLists));
    } catch (_) {}
  }

  function parseNip51PeopleList(ev) {
    const tagMap = parseTags(ev.tags || []);
    const d = firstTag(tagMap, 'd') || '';
    const name = firstTag(tagMap, 'name') || firstTag(tagMap, 'title') || d || 'Unnamed list';
    const pubkeys = (ev.tags || [])
      .filter((t) => t[0] === 'p' && t[1] && /^[0-9a-f]{64}$/i.test(t[1]))
      .map((t) => t[1]);
    return { id: `${ev.kind}:${ev.pubkey}:${d}`, name, pubkeys, kind: ev.kind, d, pubkey: ev.pubkey };
  }

  // Subscribe to user's kind:3 (contacts) and kind:30000 (people lists)
  function subscribeUserLists(pubkey) {
    const normalizedUser = normalizePubkeyHex(pubkey);
    if (!normalizedUser) return;

    // Unsubscribe old
    if (state.nip51SubId) { state.pool.unsubscribe(state.nip51SubId); state.nip51SubId = null; }
    if (state.contactsSubId) { state.pool.unsubscribe(state.contactsSubId); state.contactsSubId = null; }
    let latestContactsCreated = 0;

    // Kind 3: contact list
    state.contactsSubId = state.pool.subscribe(
      [{ kinds: [KIND_CONTACTS], authors: [normalizedUser], limit: 10 }],
      {
        event: (ev) => {
          if (ev.kind !== KIND_CONTACTS) return;
          const created = Number(ev.created_at || 0) || 0;
          if (created < latestContactsCreated) return;
          latestContactsCreated = created;

          if (!captureContactsMetadata(ev)) return;

          const pubs = (ev.tags || [])
            .map((t) => (Array.isArray(t) && t[0] === 'p' ? normalizePubkeyHex(t[1]) : ''))
            .filter(Boolean);
          state.contactListPubkeys = new Set(pubs);

          // Keep app follow state in sync with relay-backed contact list for the logged-in user.
          if (state.user && normalizePubkeyHex(state.user.pubkey) === normalizedUser) {
            state.followedPubkeys = new Set(pubs);
            persistFollowedPubkeys();
            renderFollowingCount();

            const ownStats = state.profileStatsByPubkey.get(normalizedUser) || { followers: 0, following: 0 };
            state.profileStatsByPubkey.set(normalizedUser, {
              followers: Number(ownStats.followers || 0),
              following: pubs.length
            });
            if (normalizePubkeyHex(state.selectedProfilePubkey) === normalizedUser) {
              const followingEl = qs('#profFollowing');
              if (followingEl) followingEl.textContent = formatCount(pubs.length);
            }

            const selectedStream = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
            if (selectedStream && selectedStream.hostPubkey) updateTheaterFollowBtn(selectedStream.hostPubkey);
            if (state.selectedProfilePubkey) renderProfileFollowButton(state.selectedProfilePubkey);
          }

          renderLiveGrid();
        }
      }
    );

    // Kind 30000: NIP-51 people lists
    state.nip51SubId = state.pool.subscribe(
      [{ kinds: [KIND_PEOPLE_LIST], authors: [normalizedUser], limit: 50 }],
      {
        event: (ev) => {
          if (ev.kind !== KIND_PEOPLE_LIST) return;
          const list = parseNip51PeopleList(ev);
          if (!list.pubkeys.length) return;
          state.nip51Lists.set(list.id, list);
          renderListFilterDD();
          renderLiveGrid();
        }
      }
    );
  }

  // Subscribe to an external NIP-51 list by naddr (kind:30000:pubkey:d)
  function subscribeExternalList(naddrOrUrl, onDone) {
    let naddr = naddrOrUrl.trim();

    // Handle Liststr URLs: https://listr.lol/a/naddr1...
    const listrMatch = naddr.match(/\/a\/(naddr1[a-z0-9]+)/i);
    if (listrMatch) naddr = listrMatch[1];

    // Strip trailing slashes or query params
    naddr = naddr.split(/[?#]/)[0].trim();

    if (!naddr.startsWith('naddr1')) {
      if (onDone) onDone(null, new Error('Not a valid naddr. Paste an naddr1â€¦ or a listr.lol URL.'));
      return;
    }

    // Decode via NostrTools
    ensureNostrTools().then((tools) => {
      let decoded;
      try {
        decoded = tools.nip19.decode(naddr);
      } catch (e) {
        if (onDone) onDone(null, new Error('Could not decode naddr: ' + e.message));
        return;
      }

      if (!decoded || decoded.type !== 'naddr') {
        if (onDone) onDone(null, new Error('Expected naddr type, got: ' + (decoded && decoded.type)));
        return;
      }

      const { kind, pubkey, identifier, relays: hintRelays } = decoded.data;

      const subId = state.pool.subscribe(
        [{ kinds: [kind], authors: [pubkey], '#d': [identifier], limit: 1 }],
        {
          event: (ev) => {
            if (ev.kind !== kind || ev.pubkey !== pubkey) return;
            const list = parseNip51PeopleList(ev);
            state.pool.unsubscribe(subId);

            // Check if already saved
            const existingIdx = state.savedExternalLists.findIndex((l) => l.naddr === naddr);
            const entry = { naddr, name: list.name, pubkeys: list.pubkeys };
            if (existingIdx >= 0) {
              state.savedExternalLists[existingIdx] = entry;
            } else {
              state.savedExternalLists.push(entry);
            }
            persistSavedExternalLists();
            renderListFilterDD();
            if (onDone) onDone(entry, null);
          },
          eose: () => {
            // If no event came back, report to caller
            if (onDone) onDone(null, new Error('List not found on connected relays.'));
          }
        }
      );
    }).catch((e) => {
      if (onDone) onDone(null, e);
    });
  }

  // Get the pubkeys relevant to the current filter
  function getPubkeysForFilter() {
    const f = state.activeListFilter;
    if (f === 'all') return null;                        // null = show everything
    if (f === 'following') return state.followedPubkeys; // app-level follow set
    if (f === 'contacts') return state.contactListPubkeys;

    // NIP-51 list by id
    const nip51 = state.nip51Lists.get(f);
    if (nip51) return new Set(nip51.pubkeys);

    // Saved external list by naddr
    const saved = state.savedExternalLists.find((l) => l.naddr === f);
    if (saved) return new Set(saved.pubkeys);

    return null;
  }

  /* ---- Dropdown rendering ---- */
  function renderListFilterDD() {
    // NIP-51 owned lists
    const nip51Section = qs('#lf-nip51-section');
    const nip51Items = qs('#lf-nip51-items');
    if (nip51Items) {
      nip51Items.innerHTML = '';
      if (state.nip51Lists.size > 0) {
        if (nip51Section) nip51Section.style.display = '';
        state.nip51Lists.forEach((list) => {
          const btn = document.createElement('button');
          btn.className = 'lf-item' + (state.activeListFilter === list.id ? ' active' : '');
          btn.innerHTML = `<span class="lf-dot"></span><span class="lf-item-name"></span><span class="lf-item-count">${list.pubkeys.length}</span>`;
          qs('.lf-item-name', btn).textContent = list.name;
          btn.addEventListener('click', () => setListFilter(list.id, btn));
          nip51Items.appendChild(btn);
        });
      } else {
        if (nip51Section) nip51Section.style.display = 'none';
      }
    }

    // Saved external lists
    const savedSection = qs('#lf-saved-section');
    const savedItems = qs('#lf-saved-items');
    if (savedItems) {
      savedItems.innerHTML = '';
      if (state.savedExternalLists.length > 0) {
        if (savedSection) savedSection.style.display = '';
        state.savedExternalLists.forEach((entry) => {
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;align-items:center;';

          const btn = document.createElement('button');
          btn.className = 'lf-item' + (state.activeListFilter === entry.naddr ? ' active' : '');
          btn.style.flex = '1';
          btn.innerHTML = `<span class="lf-dot"></span><span class="lf-item-name"></span><span class="lf-item-count">${entry.pubkeys.length}</span>`;
          qs('.lf-item-name', btn).textContent = entry.name;
          btn.addEventListener('click', () => setListFilter(entry.naddr, btn));

          // Remove button
          const rem = document.createElement('button');
          rem.title = 'Remove list';
          rem.innerHTML = '&times;';
          rem.style.cssText = 'background:none;border:none;color:var(--muted);cursor:pointer;font-size:.9rem;padding:.2rem .4rem;line-height:1;flex-shrink:0;';
          rem.addEventListener('click', (e) => {
            e.stopPropagation();
            state.savedExternalLists = state.savedExternalLists.filter((l) => l.naddr !== entry.naddr);
            persistSavedExternalLists();
            if (state.activeListFilter === entry.naddr) setListFilter('all', qs('#lf-all'));
            else renderListFilterDD();
          });
          rem.addEventListener('mouseover', () => { rem.style.color = 'var(--live)'; });
          rem.addEventListener('mouseout', () => { rem.style.color = 'var(--muted)'; });

          row.appendChild(btn);
          row.appendChild(rem);
          savedItems.appendChild(row);
        });
      } else {
        if (savedSection) savedSection.style.display = 'none';
      }
    }
  }

  function setActiveListFilterBtn(activeId) {
    // Deactivate all items
    qsa('.lf-item').forEach((b) => b.classList.remove('active'));
    const target = qs(`#lf-${activeId}`) || qs(`.lf-item.active`);
    if (target) target.classList.add('active');
  }

  function getFilterLabelText() {
    const f = state.activeListFilter;
    if (f === 'all') return 'All Live';
    if (f === 'following') return 'My Following';
    if (f === 'contacts') return 'Contacts';
    const n51 = state.nip51Lists.get(f);
    if (n51) return n51.name;
    const sv = state.savedExternalLists.find((l) => l.naddr === f);
    if (sv) return sv.name;
    return 'Custom List';
  }

  function renderFollowingCount() {
    const cnt = qs('#lfFollowingCount');
    if (cnt) cnt.textContent = state.followedPubkeys.size || '';
  }


  /* ---- Global controls wired to HTML ---- */
  function toggleListFilterDDInternal(e) {
    if (e) e.stopPropagation();
    const dd = qs('#listFilterDD');
    const btn = qs('#listFilterBtn');
    if (!dd || !btn) return;
    const isOpen = dd.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    state.listFilterDDOpen = isOpen;
    if (isOpen) renderListFilterDD();
  }

  function closeListFilterDD() {
    const dd = qs('#listFilterDD');
    const btn = qs('#listFilterBtn');
    if (dd) dd.classList.remove('open');
    if (btn) btn.classList.remove('open');
    state.listFilterDDOpen = false;
  }

  function setListFilterInternal(filterId, clickedBtn) {
    state.activeListFilter = filterId;

    // Update active class
    qsa('.lf-item').forEach((b) => b.classList.remove('active'));
    if (clickedBtn) clickedBtn.classList.add('active');

    // Update button label
    const label = qs('#listFilterLabel');
    if (label) label.textContent = getFilterLabelText();

    closeListFilterDD();
    renderLiveGrid();
  }

  function lfAddInputChangeInternal(inputEl) {
    // Optional: real-time validation feedback could go here
  }

  function lfAddListInternal() {
    const input = qs('#lfAddInput');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    const btn = qs('.lf-add-btn');
    if (btn) { btn.textContent = 'â€¦'; btn.disabled = true; }

    subscribeExternalList(val, (entry, err) => {
      if (btn) { btn.textContent = 'Add'; btn.disabled = false; }
      if (err) {
        const hint = qs('.lf-add-hint');
        if (hint) { hint.style.color = 'var(--live)'; hint.textContent = err.message; setTimeout(() => { hint.style.color = ''; hint.textContent = 'Paste a Liststr URL or NIP-51 naddr to load a curated list of streamers.'; }, 4000); }
        return;
      }
      input.value = '';
      renderListFilterDD();
      setListFilterInternal(entry.naddr, null);
    });
  }

  function buildStreamCard(stream, idx) {
    // NIP-53: show actual streamer (hostPubkey), not the platform publisher
    const p = profileFor(stream.hostPubkey);
    const card = document.createElement('div');
    const viewerCount = effectiveParticipants(stream);
    const hasViewers = viewerCount > 0;
    const hasVideo = !!stream.streaming;
    card.className = 'stream-card' + (!hasViewers && !hasVideo ? ' stream-card-dim' : '');

    const gradients = ['t1','t2','t3','t4','t5','t6','t7','t8'];
    let thumbHtml;
    if (stream.image) {
      const fb = gradients[idx % gradients.length];
      thumbHtml = `<div class="ct-thumb-wrap"><img class="ct-thumb" src="${stream.image}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'tc ${fb}\\'></div>'"></div>`;
    } else {
      thumbHtml = `<div class="tc ${gradients[idx % gradients.length]}"></div>`;
    }

    const statusLabel = stream.status === 'planned' ? 'SOON' : stream.status.toUpperCase();
    const statusBg = stream.status === 'planned' ? 'background:var(--purple)' : '';
    const viewerText = hasViewers ? `&#128065; ${viewerCount.toLocaleString()}` : (hasVideo ? '&#128065; 0' : '&#8212;');

    card.innerHTML = `
      <div class="ct">
        <div class="ct-inner">${thumbHtml}</div>
        <div class="cb-live" style="${statusBg}"><span class="live-dot"></span>${statusLabel}</div>
        <div class="cb-viewers">${viewerText}</div>
      </div>
      <div class="ci">
        <div class="ci-row">
          <div class="ci-av"></div>
          <div>
            <div class="ci-title"></div>
            <div class="ci-host"></div>
            <div class="ci-tags"><span class="ci-hosted-badge"></span></div>
          </div>
        </div>
      </div>`;

    const avEl = qs('.ci-av', card);
    if (avEl) {
      setAvatarEl(avEl, p.picture || '', pickAvatar(stream.hostPubkey));
      const verifiedNip05 = getVerifiedNip05ForPubkey(stream.hostPubkey, p.nip05 || '');
      if (verifiedNip05) avEl.classList.add('nip05-square');
      else if (normalizeNip05Value(p.nip05 || '')) ensureNip05Verification(stream.hostPubkey, p.nip05 || '').catch(() => {});
    }
    qs('.ci-title', card).textContent = stream.title;
    qs('.ci-host', card).textContent = p.display_name || p.name || shortHex(stream.hostPubkey);
    const hostedBadge = qs('.ci-hosted-badge', card);
    if (hostedBadge && stream.platformPubkey) {
      const plat = profileFor(stream.platformPubkey);
      const platDisplayName = plat.display_name || plat.name || '';
      const hostDisplayName = p.display_name || p.name || '';
      // Only show if the platform is genuinely different from the streamer
      if (platDisplayName && platDisplayName !== hostDisplayName) {
        hostedBadge.textContent = 'via ' + platDisplayName;
      }
    }
    card.addEventListener('click', () => openStream(stream.address));
    return card;
  }

  function getFilteredStreams() {
    // Only show streams that have a browser-playable HTTP(S) URL
    const allStreams = sortedLiveStreams().filter((s) => {
      const url = (s.streaming || '').trim();
      return url && /^https?:\/\//i.test(url);
    });
    const filterPubkeys = getPubkeysForFilter();
    return filterPubkeys
      ? allStreams.filter((s) => filterPubkeys.has(s.pubkey) || filterPubkeys.has(s.hostPubkey))
      : allStreams;
  }

  function renderLiveGrid() {
    const grid = qs('#liveGrid');
    const sentinel = qs('#liveGridSentinel');
    if (!grid) return;

    const allStreams = sortedLiveStreams();
    const streams = getFilteredStreams();

    // Update count pill
    const pill = qs('#liveCountPill');
    if (pill) pill.textContent = streams.length ? `${streams.length} live` : '';

    // Reset page counter and disconnect old observer
    state.liveGridPage = 0;
    if (state.liveGridObserver) { state.liveGridObserver.disconnect(); state.liveGridObserver = null; }

    // Loading state
    if (allStreams.length === 0) {
      grid.innerHTML = '<div class="live-grid-loading"><div class="lf-spinner"></div>Syncing streams from relaysâ€¦</div>';
      return;
    }

    // Empty for filter
    if (streams.length === 0) {
      const f = state.activeListFilter;
      const filterName = f === 'following' ? 'your following list'
        : (() => {
          const n51 = state.nip51Lists.get(f);
          if (n51) return `"${n51.name}"`;
          const sv = state.savedExternalLists.find((l) => l.naddr === f);
          if (sv) return `"${sv.name}"`;
          return 'this filter';
        })();
      grid.innerHTML = `<div class="following-empty" style="grid-column:1/-1"><div class="following-empty-icon">📡</div><div class="following-empty-title">No live streams in ${filterName}</div><div class="following-empty-sub">Nobody in this list is streaming right now.</div></div>`;
      return;
    }

    // Render first page
    grid.innerHTML = '';
    const firstBatch = streams.slice(0, state.GRID_PAGE_SIZE);
    firstBatch.forEach((s, i) => grid.appendChild(buildStreamCard(s, i)));
    state.liveGridPage = 1;

    // If all loaded, show end marker
    if (streams.length <= state.GRID_PAGE_SIZE) {
      grid.insertAdjacentHTML('beforeend', `<div class="live-grid-end">&#8212; ${streams.length} streams loaded &#8212;</div>`);
      return;
    }

    // Set up IntersectionObserver on sentinel for infinite scroll
    if (sentinel && 'IntersectionObserver' in window) {
      state.liveGridObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        loadMoreStreams();
      }, { rootMargin: '200px' });
      state.liveGridObserver.observe(sentinel);
    }
  }

  function loadMoreStreams() {
    const grid = qs('#liveGrid');
    if (!grid) return;
    const streams = getFilteredStreams();
    const start = state.liveGridPage * state.GRID_PAGE_SIZE;
    if (start >= streams.length) {
      if (state.liveGridObserver) { state.liveGridObserver.disconnect(); state.liveGridObserver = null; }
      // Remove existing end marker then add final one
      const existing = grid.querySelector('.live-grid-end');
      if (existing) existing.remove();
      grid.insertAdjacentHTML('beforeend', `<div class="live-grid-end">&#8212; ${streams.length} streams loaded &#8212;</div>`);
      return;
    }

    const batch = streams.slice(start, start + state.GRID_PAGE_SIZE);
    const offset = start; // for gradient cycling
    batch.forEach((s, i) => grid.appendChild(buildStreamCard(s, offset + i)));
    state.liveGridPage++;
  }

  /* =========================================================
     HERO FEATURED STREAM SYSTEM
     - Randomly features available live streams
     - Autoplay with AUDIO (muted only if browser blocks)
     - Skips streams where playback fails
     - Sci-fi glitch/scan-line transition between streams
     - Cycles every 120 s with progress bar; prev/next nav
     ========================================================= */
  const HERO_CYCLE_MS = 120000;

  function heroFeaturedStreams() {
    return sortedLiveStreams().filter(
      (s) => {
        const url = (s.streaming || '').trim();
        return url && /^https?:\/\//i.test(url) && !state.featuredFailed.has(s.address);
      }
    );
  }

  /* ---- Sci-fi transition animation ---- */
  function runHeroTransition(cb) {
    const ov = qs('#heroTransitionOv');
    const player = qs('#heroPlayer');
    if (!ov) { cb(); return; }

    // Spawn data-rain particles
    const NUM_PARTICLES = 18;
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const p = document.createElement('div');
      p.className = 'hero-data-particle';
      const h = 30 + Math.random() * 120;
      p.style.cssText = `left:${Math.random() * 100}%;height:${h}px;animation-delay:${Math.random() * 0.25}s;opacity:0;`;
      ov.appendChild(p);
      particles.push(p);
    }

    // Show the fx layers
    ['heroScanLine','heroGlitchA','heroGlitchB','heroGridFlash','heroStatic'].forEach((id) => {
      const el = qs(`#${id}`);
      if (el) el.style.display = '';
    });
    ov.classList.add('active');

    // Glitch background on hero player too
    if (player) player.style.filter = 'brightness(1.4) hue-rotate(-15deg)';

    setTimeout(() => {
      if (player) player.style.filter = '';
      // Clear particles
      particles.forEach((p) => p.remove());
      ['heroScanLine','heroGlitchA','heroGlitchB','heroGridFlash','heroStatic'].forEach((id) => {
        const el = qs(`#${id}`);
        if (el) el.style.display = 'none';
      });
      ov.classList.remove('active');
      cb();
    }, 680);
  }

  /* ---- Progress bar RAF loop ---- */
  function startProgressBar() {
    const fill = qs('#heroCycleBarFill');
    if (!fill) return;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    state.featuredCycleStart = Date.now();

    function tick() {
      const elapsed = Date.now() - state.featuredCycleStart;
      const pct = Math.min((elapsed / HERO_CYCLE_MS) * 100, 100);
      fill.style.width = pct + '%';
      if (pct < 100) {
        state.featuredCycleRafId = requestAnimationFrame(tick);
      }
    }
    if (state.featuredCycleRafId) cancelAnimationFrame(state.featuredCycleRafId);
    state.featuredCycleRafId = requestAnimationFrame(tick);
  }

  /* ---- Indicators ---- */
  function renderHeroIndicators(streams, activeIdx) {
    const wrap = qs('#heroIndicators');
    if (!wrap) return;
    wrap.innerHTML = '';
    const count = Math.min(streams.length, 12);
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'hero-dot' + (i === activeIdx ? ' active' : '');
      dot.addEventListener('click', (e) => { e.stopPropagation(); heroGoTo(i, true); });
      wrap.appendChild(dot);
    }
  }

  /* ---- Clear hero HLS ---- */
  function clearHeroPlayback() {
    state.heroPlaybackToken++;
    state.featuredCurrentAddress = '';
    setActiveHeroViewerAddress('');
    if (state.heroHlsInstance) {
      try { state.heroHlsInstance.destroy(); } catch (_) {}
      state.heroHlsInstance = null;
    }
  }

  /* ---- Load and autoplay with AUDIO ---- */
  async function renderHeroPlayer(stream, token) {
    const playerEl = qs('#heroPlayer');
    const bgEl = qs('#heroPlayerBg');
    const ovEl = qs('#heroPlayOv');
    if (!playerEl || !bgEl) return;

    const url = sanitizeMediaUrl(stream.streaming || '');
    const image = sanitizeMediaUrl(stream.image || '');

    // Set background: thumbnail or gradient
    if (image) {
      const safeImage = image.replace(/"/g, '\\"');
      bgEl.style.cssText = `width:100%;height:100%;background:url("${safeImage}") center/cover no-repeat,linear-gradient(135deg,#0d1e30,#1a0a00);`;
    } else {
      bgEl.style.cssText = 'width:100%;height:100%;background:linear-gradient(135deg,#0d1e30,#1a0a00,#080d18);';
    }

    // Wipe any existing video
    const existingVid = playerEl.querySelector('video');
    if (existingVid) existingVid.remove();
    if (ovEl) ovEl.style.display = '';

    if (!url || !/^https?:\/\//i.test(url)) {
      setActiveHeroViewerAddress('');
      return;
    }

    const video = document.createElement('video');
    // Start muted so browser allows autoplay, then unmute immediately
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'auto';
    video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;background:#000;z-index:2;';

    const isHls = /\.m3u8($|\?)/i.test(url);
    let hlsObj = null;

    // On media loaded / playing â†’ unmute for audio
    const onCanPlay = () => {
      if (token !== state.heroPlaybackToken) return;
      setActiveHeroViewerAddress(stream.address);
      video.muted = false; // restore audio
      video.volume = 0.8;
      if (ovEl) ovEl.style.display = 'none';
    };
    video.addEventListener('canplay', onCanPlay, { once: true });

    // On error â†’ mark as failed and advance
    video.addEventListener('error', () => {
      if (token !== state.heroPlaybackToken) return;
      setActiveHeroViewerAddress('');
      state.featuredFailed.add(stream.address);
      heroAdvance(1); // skip to next
    });

    playerEl.appendChild(video);

    if (isHls) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.play().catch(() => {});
      } else {
        try {
          const Hls = await ensureHlsJs();
          if (token !== state.heroPlaybackToken) return;
          if (Hls.isSupported()) {
            hlsObj = new Hls({ enableWorker: true, lowLatencyMode: true, maxBufferLength: 10 });
            state.heroHlsInstance = hlsObj;
            hlsObj.loadSource(url);
            hlsObj.attachMedia(video);
            hlsObj.on(Hls.Events.MANIFEST_PARSED, () => {
              if (token !== state.heroPlaybackToken) return;
              video.play().catch(() => {});
            });
            hlsObj.on(Hls.Events.ERROR, (_e, data) => {
              if (data && data.fatal && token === state.heroPlaybackToken) {
                setActiveHeroViewerAddress('');
                state.featuredFailed.add(stream.address);
                heroAdvance(1);
              }
            });
          }
        } catch (_) {
          if (token === state.heroPlaybackToken) {
            setActiveHeroViewerAddress('');
            state.featuredFailed.add(stream.address);
            heroAdvance(1);
          }
        }
      }
    } else {
      video.src = url;
      video.play().catch(() => {});
    }
  }

  /* ---- Render hero info panel ---- */
  function renderHero(stream, idx, total) {
    if (!stream) return;
    state.featuredCurrentAddress = stream.address;
    const p = profileFor(stream.hostPubkey);

    const set = (id, v) => { const el = qs('#' + id); if (el) el.textContent = v; };
    const viewerCount = effectiveParticipants(stream);
    set('heroTitle', stream.title);
    set('heroSummary', stream.summary || 'Live stream on Nostr.');
    set('heroHostName', p.name);
    set('heroStatusLabel', (stream.status || 'live').toUpperCase());
    set('heroViewers', viewerCount > 0 ? viewerCount.toLocaleString() : '-');
    set('heroSats', '-');
    set('heroTime', stream.starts ? new Date(stream.starts * 1000).toUTCString().slice(17, 22) + ' UTC' : 'live');

    const avEl = qs('#heroAv');
    if (avEl) setAvatarEl(avEl, p.picture || '', pickAvatar(stream.hostPubkey));
    const nip05El = qs('#heroNip05');
    const heroNip05 = getVerifiedNip05ForPubkey(stream.hostPubkey, p.nip05 || '');
    if (!heroNip05 && normalizeNip05Value(p.nip05 || '')) ensureNip05Verification(stream.hostPubkey, p.nip05 || '').catch(() => {});
    if (nip05El) { nip05El.style.display = heroNip05 ? 'inline' : 'none'; if (heroNip05) nip05El.title = heroNip05; }

    // Wire click to open stream
    const heroEl = qs('#heroStream');
    if (heroEl) heroEl.onclick = () => openStream(stream.address);
    const watchBtn = qs('#heroWatchBtn');
    if (watchBtn) watchBtn.onclick = (e) => { e.stopPropagation(); openStream(stream.address); };

    renderHeroIndicators(heroFeaturedStreams(), idx);
  }

  /* ---- Navigate to a specific index ---- */
  function heroGoTo(idx, userInitiated) {
    const streams = heroFeaturedStreams();
    if (!streams.length) return;
    state.featuredIndex = ((idx % streams.length) + streams.length) % streams.length;

    if (userInitiated) {
      // Instant switch without transition for user-clicked nav
      clearHeroPlayback();
      const token = state.heroPlaybackToken;
      renderHero(streams[state.featuredIndex], state.featuredIndex, streams.length);
      renderHeroPlayer(streams[state.featuredIndex], token);
      resetHeroCycle();
    } else {
      // Auto-cycle: play the sci-fi transition then swap
      runHeroTransition(() => {
        clearHeroPlayback();
        const token = state.heroPlaybackToken;
        renderHero(streams[state.featuredIndex], state.featuredIndex, streams.length);
        renderHeroPlayer(streams[state.featuredIndex], token);
      });
    }
  }

  /* ---- Advance by delta (wraps) ---- */
  function heroAdvance(delta) {
    const streams = heroFeaturedStreams();
    if (!streams.length) return;
    heroGoTo(state.featuredIndex + delta, false);
    resetHeroCycle();
  }

  /* ---- Reset / restart the 120-s cycle timer ---- */
  function resetHeroCycle() {
    if (state.featuredCycleTimer) clearInterval(state.featuredCycleTimer);
    startProgressBar();
    state.featuredCycleTimer = setInterval(() => heroAdvance(1), HERO_CYCLE_MS);
  }

  /* ---- Start hero cycle on page load ---- */
  function startHeroCycle() {
    const streams = heroFeaturedStreams();
    if (!streams.length) return;
    state.featuredIndex = Math.floor(Math.random() * streams.length);
    clearHeroPlayback();
    const token = state.heroPlaybackToken;
    renderHero(streams[state.featuredIndex], state.featuredIndex, streams.length);
    renderHeroPlayer(streams[state.featuredIndex], token);
    resetHeroCycle();
  }

  function stopHeroCycle() {
    if (state.featuredCycleTimer) { clearInterval(state.featuredCycleTimer); state.featuredCycleTimer = null; }
    if (state.featuredCycleRafId) { cancelAnimationFrame(state.featuredCycleRafId); state.featuredCycleRafId = null; }
    clearHeroPlayback();
  }

  function clearPlayback() {
    state.playbackToken += 1;
    if (state.hlsInstance) {
      try {
        state.hlsInstance.destroy();
      } catch (_) {
        // no-op
      }
      state.hlsInstance = null;
    }
  }

  function renderPlaybackFallback(message, url) {
    const playerBg = qs('.player-bg');
    const playerUi = qs('.player-ui');
    if (!playerBg) return;

    if (playerUi) playerUi.style.display = '';
    playerBg.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding:1rem;text-align:center;gap:.5rem;color:#d0d7e2;';

    const msg = document.createElement('div');
    msg.style.cssText = 'font-size:.85rem;line-height:1.5;';
    msg.textContent = message;
    wrap.appendChild(msg);

    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open stream URL';
      link.style.cssText = 'color:#f7b731;text-decoration:none;font-family:"DM Mono",monospace;font-size:.75rem;';
      wrap.appendChild(link);
    }

    playerBg.appendChild(wrap);
  }

  async function renderVideoPlayback(stream) {
    clearPlayback();

    const token = state.playbackToken;
    const playerBg = qs('.player-bg');
    const playerUi = qs('.player-ui');
    if (!playerBg) return;
    if (normalizeStreamStatus(stream.status) === 'ended') {
      const endedSummary = String(stream.summary || '').trim();
      const message = endedSummary ? `Stream ended. ${endedSummary}` : 'Stream ended.';
      renderPlaybackFallback(message, stream.streaming || '');
      return;
    }

    const url = (stream.streaming || '').trim();
    if (!url) {
      if (playerUi) playerUi.style.display = '';
      playerBg.textContent = 'LIVE';
      return;
    }

    if (!/^https?:\/\//i.test(url)) {
      renderPlaybackFallback('This stream uses a non-HTTP source. Open it in your external player.', url);
      return;
    }

    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.muted = false;
    video.defaultMuted = false;
    video.playsInline = true;
    video.preload = 'metadata';
    video.style.cssText = 'width:100%;height:100%;object-fit:cover;background:#000;';

    video.addEventListener('error', () => {
      if (token !== state.playbackToken) return;
      renderPlaybackFallback('Playback failed. The stream URL may be offline or unsupported.', url);
    });

    playerBg.innerHTML = '';
    playerBg.appendChild(video);
    if (playerUi) playerUi.style.display = 'none';

    const isHlsUrl = /\.m3u8($|\?)/i.test(url) || /zap\.stream\//i.test(url);

    if (isHlsUrl) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        try {
          const Hls = await ensureHlsJs();
          if (token !== state.playbackToken) return;
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
              maxBufferLength: 30,
              maxMaxBufferLength: 60,
              manifestLoadingTimeOut: 15000,
              manifestLoadingMaxRetry: 4,
              manifestLoadingRetryDelay: 1000,
              levelLoadingTimeOut: 15000,
              levelLoadingMaxRetry: 4,
              fragLoadingTimeOut: 20000,
              fragLoadingMaxRetry: 4,
              xhrSetup: (xhr) => { xhr.withCredentials = false; }
            });
            state.hlsInstance = hls;
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              if (token !== state.playbackToken) return;
              video.play().catch(() => { video.muted = true; video.play().catch(() => {}); });
            });
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (token !== state.playbackToken || !data.fatal) return;
              if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
                try { hls.startLoad(); } catch (_) {
                  renderPlaybackFallback('Stream connection lost. The stream may have ended.', url);
                }
              } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
                try { hls.recoverMediaError(); } catch (_) {
                  renderPlaybackFallback('Media decode error. Try opening the stream directly.', url);
                }
              } else {
                renderPlaybackFallback('HLS playback error. Try opening the stream directly.', url);
              }
            });
            return; // play triggered via MANIFEST_PARSED
          } else {
            renderPlaybackFallback('HLS is not supported in this browser.', url);
            return;
          }
        } catch (_) {
          renderPlaybackFallback('Could not load the HLS player library.', url);
          return;
        }
      }
    } else {
      video.src = url;
    }

    try {
      await video.play();
    } catch (_) {
      try {
        video.muted = true;
        await video.play();
      } catch (_) {
        // user gesture may still be required; controls remain visible
      }
    }
  }

  function renderVideo(stream) {
    const p = profileFor(stream.hostPubkey);

    // Title & summary
    const title = qs('.sib-title');
    if (title) title.textContent = stream.title;
    const summary = qs('.sib-summary');
    if (summary) summary.textContent = stream.summary || 'Live stream.';
    const streamLinkRow = qs('#theaterStreamLinkRow');
    const streamLinkEl = qs('#theaterStreamLink');
    if (streamLinkEl && streamLinkRow) {
      const naddr = encodeStreamNaddr(stream);
      const href = naddr ? `${window.location.origin}/${naddr}` : window.location.href;
      streamLinkEl.href = href;
      streamLinkEl.textContent = href;
      streamLinkRow.style.display = 'flex';
    }

    // Host avatar
    const av = qs('.sib-av');
    if (av) {
      setAvatarEl(av, p.picture || '', pickAvatar(stream.hostPubkey));
      av.onclick = () => showProfileByPubkey(stream.hostPubkey);
    }

    // Host name + nip05
    const name = qs('.sib-name');
    const verifiedNip05 = getVerifiedNip05ForPubkey(stream.hostPubkey, p.nip05 || '');
    if (!verifiedNip05 && normalizeNip05Value(p.nip05 || '')) ensureNip05Verification(stream.hostPubkey, p.nip05 || '').catch(() => {});
    if (name) {
      name.innerHTML = '';
      name.textContent = p.name || shortHex(stream.hostPubkey);
      if (verifiedNip05) {
        const badge = document.createElement('span');
        badge.className = 'nip05-badge';
        badge.title = `NIP-05: ${verifiedNip05}`;
        badge.textContent = '\u2713';
        name.appendChild(document.createTextNode(' '));
        name.appendChild(badge);
      }
    }
    const ident = qs('.sib-identity');
    if (ident) ident.textContent = verifiedNip05 || shortHex(stream.hostPubkey);

    // Hosted-by box: inline in .sib-host-row to the right of .sib-host-info
    let sibHostedBy = qs('.sib-hosted-by');
    if (!sibHostedBy) {
      sibHostedBy = document.createElement('div');
      sibHostedBy.className = 'sib-hosted-by';
      const hostRow = qs('.sib-host-row');
      if (hostRow) hostRow.appendChild(sibHostedBy);
      else if (ident && ident.parentNode) ident.parentNode.appendChild(sibHostedBy);
    }
    sibHostedBy.innerHTML = '';
    if (stream.platformPubkey) {
      const plat = profileFor(stream.platformPubkey);
      const host = profileFor(stream.hostPubkey);
      const platName = plat.display_name || plat.name || '';
      const hostName = host.display_name || host.name || '';
      if (platName && platName !== hostName) {
        const platPic = (plat.picture || '').trim();
        const avHtml = platPic
          ? `<img src="${platPic}" alt="" onerror="this.style.display='none'">`
          : `<span class="hosted-by-av-fallback">${platName.charAt(0).toUpperCase()}</span>`;
        sibHostedBy.innerHTML = `<div class="hosted-by-box"><div class="hosted-by-av">${avHtml}</div><div class="hosted-by-inner"><span class="hosted-by-label">Hosted via</span><span class="hosted-by-name">${platName}</span></div></div>`;
        const box = sibHostedBy.querySelector('.hosted-by-box');
        if (box) box.addEventListener('click', () => showProfileByPubkey(stream.platformPubkey));
      }
    }

    // Stats â€” viewers & relays
    const viewers = qs('#theaterViewers');
    if (viewers) viewers.textContent = formatCount(effectiveParticipants(stream));
    const relays = qs('#theaterRelays');
    if (relays) relays.textContent = String(state.relays.length);

    // Sats â€” sum of zaps received on this stream (if tracked), else show 'â€”'
    const satsEl = qs('#theaterSats');
    if (satsEl) {
      const zapTotal = state.streamZapTotals && state.streamZapTotals.get(stream.address);
      satsEl.textContent = zapTotal != null ? formatCount(zapTotal) : '-';
    }

    // Followers â€” fetch from profileStats if already loaded
    const followersEl = qs('#theaterFollowers');
    if (followersEl) {
      const stats = state.profileStatsByPubkey && state.profileStatsByPubkey.get(stream.pubkey);
      followersEl.textContent = stats ? formatCount(stats.followers || 0) : '-';
    }

    // Runtime counter â€” ticks every second from stream.starts
    clearInterval(state._theaterRuntimeInterval);
    const runtimeEl = qs('#theaterRuntime');
    if (runtimeEl) {
      const updateRuntime = () => {
        const startTs = stream.starts || stream.created_at;
        if (!startTs) { runtimeEl.textContent = '-'; return; }
        const secs = Math.max(0, Math.floor(Date.now() / 1000) - startTs);
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        runtimeEl.textContent = h > 0
          ? `${h}h ${String(m).padStart(2,'0')}m`
          : `${m}m ${String(s).padStart(2,'0')}s`;
      };
      updateRuntime();
      state._theaterRuntimeInterval = setInterval(updateRuntime, 1000);
    }

    // Reactions row state
    const likeBtn = qs('#likeBtn');
    const isLiked = state.likedStreamAddresses.has(stream.address);
    if (likeBtn) likeBtn.classList.toggle('liked', isLiked);
    renderStreamReactionsUi(stream);

    // Follow/share button state
    updateTheaterFollowBtn(stream.hostPubkey);
    updateTheaterShareBtn(stream);
    refreshOwnStreamBoostState(stream);

    renderVideoPlayback(stream);

    // Owner-only controls
    // Ownership: the person who published the NIP-53 event (stream.pubkey), not the host
    const owner = state.user && state.user.pubkey === stream.pubkey;
    const endBtn = qs('#endStreamBtn');
    if (endBtn) endBtn.classList.toggle('visible', !!owner);
    qsa('.owner-only').forEach((n) => n.classList.toggle('visible', !!owner));
  }

  function updateTheaterFollowBtn(pubkey) {
    const btn = qs('#theaterFollowBtn');
    if (!btn) return;
    const isFollowing = isFollowingPubkey(pubkey);
    btn.textContent = isFollowing ? 'Unfollow' : 'Follow';
    btn.classList.toggle('following-active', isFollowing);
  }

  function updateTheaterShareBtn(stream) {
    const btn = qs('#theaterShareBtn');
    if (!btn) return;
    const boosted = !!(state.user && stream && state.boostedStreamAddresses.has(stream.address));
    btn.classList.toggle('boosted', boosted);
  }

  async function findOwnStreamBoostEventId(stream) {
    if (!state.user || !stream || !state.pool) return '';
    const own = normalizePubkeyHex(state.user.pubkey);
    if (!own || !stream.id || !stream.address) return '';

    return new Promise((resolve) => {
      const reposts = new Map();
      const deletedIds = new Set();
      let done = false;
      let subId = null;

      const finish = (id = '') => {
        if (done) return;
        done = true;
        if (subId) {
          try { state.pool.unsubscribe(subId); } catch (_) {}
        }
        resolve(id || '');
      };

      const timeout = setTimeout(() => finish(''), 1800);
      const safeFinish = (id = '') => {
        clearTimeout(timeout);
        finish(id);
      };

      subId = state.pool.subscribe(
        [
          { kinds: [6], authors: [own], '#e': [stream.id], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 120 },
          { kinds: [6], authors: [own], '#a': [stream.address], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 120 },
          { kinds: [KIND_DELETION], authors: [own], limit: 150, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 120 }
        ],
        {
          event: (ev) => {
            if (!ev || !ev.id) return;
            if (ev.kind === 6) {
              reposts.set(ev.id, ev);
              return;
            }
            if (ev.kind === KIND_DELETION) {
              (ev.tags || []).forEach((t) => {
                if (Array.isArray(t) && t[0] === 'e' && t[1]) deletedIds.add(String(t[1]));
              });
            }
          },
          eose: () => {
            const newest = Array.from(reposts.values())
              .sort((a, b) => (b.created_at || 0) - (a.created_at || 0))
              .find((ev) => !deletedIds.has(ev.id));
            safeFinish(newest ? newest.id : '');
          }
        }
      );
    });
  }

  async function refreshOwnStreamBoostState(stream) {
    if (!stream || !stream.address) return;
    if (!state.user || !state.pool) {
      state.boostedStreamAddresses.delete(stream.address);
      state.streamBoostEventIdByAddress.delete(stream.address);
      state.streamBoostCheckedByAddress.delete(stream.address);
      state.streamBoostCheckPendingByAddress.delete(stream.address);
      updateTheaterShareBtn(stream);
      return;
    }

    if (state.streamBoostCheckedByAddress.has(stream.address) || state.streamBoostCheckPendingByAddress.has(stream.address)) {
      updateTheaterShareBtn(stream);
      return;
    }

    state.streamBoostCheckPendingByAddress.add(stream.address);
    try {
      const boostId = await findOwnStreamBoostEventId(stream);
      if (boostId) {
        state.boostedStreamAddresses.add(stream.address);
        state.streamBoostEventIdByAddress.set(stream.address, boostId);
      } else {
        state.boostedStreamAddresses.delete(stream.address);
        state.streamBoostEventIdByAddress.delete(stream.address);
      }
      state.streamBoostCheckedByAddress.add(stream.address);
      if (state.selectedStreamAddress === stream.address) updateTheaterShareBtn(stream);
    } catch (_) {
      // no-op
    } finally {
      state.streamBoostCheckPendingByAddress.delete(stream.address);
    }
  }

  // Debounce timer for relay search
  let _searchRelaySubId = null;
  let _searchDebounceTimer = null;

  function buildSearchProfileItem(p, box) {
    const item = document.createElement('div');
    item.className = 'sr-item';
    const verifiedNip05 = getVerifiedNip05ForPubkey(p.pubkey, p.nip05 || '');
    if (!verifiedNip05 && normalizeNip05Value(p.nip05 || '')) ensureNip05Verification(p.pubkey, p.nip05 || '').catch(() => {});
    const hasNip05 = !!verifiedNip05;
    const avClass = hasNip05 ? 'sr-av nip05-square' : 'sr-av';
    item.innerHTML = `<div class="${avClass}"></div><div><div class="sr-title"></div><div class="sr-sub"></div></div>`;
    setAvatarEl(qs('.sr-av', item), p.picture || '', pickAvatar(p.pubkey));
    qs('.sr-title', item).textContent = p.name;
    qs('.sr-sub', item).textContent = verifiedNip05 || shortHex(p.pubkey);
    item.addEventListener('click', () => {
      showProfileByPubkey(p.pubkey);
      box.classList.remove('open');
    });
    return item;
  }

  function renderSearch(term) {
    const box = qs('#searchResults');
    if (!box) return;

    // Cancel any in-flight relay search
    if (_searchDebounceTimer) { clearTimeout(_searchDebounceTimer); _searchDebounceTimer = null; }
    if (_searchRelaySubId && state.pool) {
      try { state.pool.unsubscribe(_searchRelaySubId); } catch (_) {}
      _searchRelaySubId = null;
    }

    if (!term) {
      box.classList.remove('open');
      return;
    }

    const streams = sortedLiveStreams().filter((s) => s.title.toLowerCase().includes(term) || profileFor(s.hostPubkey).name.toLowerCase().includes(term)).slice(0, 5);

    // Local cache match â€” all cached profiles, not just streamers
    const localProfiles = Array.from(state.profilesByPubkey.values()).filter((p) => {
      const t = term.toLowerCase();
      return (p.name || '').toLowerCase().includes(t) ||
             (p.display_name || '').toLowerCase().includes(t) ||
             (p.username || '').toLowerCase().includes(t) ||
             (p.nip05 || '').toLowerCase().includes(t) ||
             (p.pubkey || '').toLowerCase().startsWith(t);
    }).slice(0, 8);

    function rebuildBox(extraProfiles) {
      box.innerHTML = '';

      // --- Streams ---
      if (streams.length) {
        const streamLabel = document.createElement('span');
        streamLabel.className = 'sr-label';
        streamLabel.textContent = 'Live Streams';
        box.appendChild(streamLabel);

        streams.forEach((s) => {
          const p = profileFor(s.pubkey);
          const item = document.createElement('div');
          item.className = 'sr-item';
          item.innerHTML = `<div class="sr-av rect">L</div><div><div class="sr-title"></div><div class="sr-sub"></div></div><span class="sr-live">LIVE</span>`;
          qs('.sr-title', item).textContent = s.title;
          qs('.sr-sub', item).textContent = p.name;
          item.addEventListener('click', () => { openStream(s.address); box.classList.remove('open'); });
          box.appendChild(item);
        });

        const sep = document.createElement('div'); sep.className = 'dd-sep'; box.appendChild(sep);
      }

      // Merge local + extra, de-dupe by pubkey
      const seen = new Set();
      const merged = [];
      [...localProfiles, ...extraProfiles].forEach((p) => {
        if (!seen.has(p.pubkey)) { seen.add(p.pubkey); merged.push(p); }
      });

      // --- Users ---
      const userLabel = document.createElement('span');
      userLabel.className = 'sr-label';
      userLabel.textContent = merged.length ? 'Users' : 'Searching Nostrâ€¦';
      box.appendChild(userLabel);

      merged.slice(0, 8).forEach((p) => {
        box.appendChild(buildSearchProfileItem(p, box));
      });

      box.classList.add('open');
    }

    rebuildBox([]);

    // --- Relay queries for broad Nostr search ---
    _searchDebounceTimer = setTimeout(async () => {
      if (!state.pool) return;

      const extraProfiles = [];
      const relayResults = new Map(); // pubkey -> event

      // 1. If looks like npub â†’ decode + fetch by pubkey
      const npubMatch = term.match(/^npub1[023456789acdefghjklmnpqrstuvwxyz]{6,}/i);
      if (npubMatch) {
        try {
          const tools = await ensureNostrTools();
          const dec = tools.nip19.decode(npubMatch[0].toLowerCase());
          if (dec && dec.type === 'npub') {
            const subId = state.pool.subscribe([{ kinds: [KIND_PROFILE], authors: [dec.data], limit: 1 }], {
              event(ev) {
                const p = parseProfile(ev);
                state.profilesByPubkey.set(p.pubkey, p);
                relayResults.set(p.pubkey, p);
                rebuildBox(Array.from(relayResults.values()));
              },
              eose() {}
            });
            _searchRelaySubId = subId;
          }
        } catch (_) {}
        return;
      }

      // 2. If looks like nip-05 (contains @) â†’ resolve via .well-known
      if (term.includes('@') && term.split('@').length === 2) {
        const [localPart, domain] = term.split('@');
        if (localPart && domain && domain.includes('.')) {
          try {
            const resp = await fetch(`https://${domain}/.well-known/nostr.json?name=${encodeURIComponent(localPart)}`);
            const data = await resp.json();
            const pubkey = data.names && (data.names[localPart] || data.names[localPart.toLowerCase()]);
            if (pubkey && /^[0-9a-f]{64}$/i.test(pubkey)) {
              const subId = state.pool.subscribe([{ kinds: [KIND_PROFILE], authors: [pubkey], limit: 1 }], {
                event(ev) {
                  const p = parseProfile(ev);
                  state.profilesByPubkey.set(p.pubkey, p);
                  relayResults.set(p.pubkey, p);
                  rebuildBox(Array.from(relayResults.values()));
                },
                eose() {}
              });
              _searchRelaySubId = subId;
            }
          } catch (_) {}
          return;
        }
      }

      // 3. General text search â€” use NIP-50 search filter (supported by many relays)
      //    Also fetch recent kind:0 events and filter locally
      const filters = [];
      if (term.length >= 2) {
        filters.push({ kinds: [KIND_PROFILE], search: term, limit: 20 });
      }

      if (filters.length) {
        const subId = state.pool.subscribe(filters, {
          event(ev) {
            if (relayResults.has(ev.pubkey)) {
              if ((relayResults.get(ev.pubkey).created_at || 0) >= (ev.created_at || 0)) return;
            }
            const p = parseProfile(ev);
            state.profilesByPubkey.set(p.pubkey, p);
            const t = term.toLowerCase();
            const matches = (p.name || '').toLowerCase().includes(t) ||
                            (p.display_name || '').toLowerCase().includes(t) ||
                            (p.username || '').toLowerCase().includes(t) ||
                            (p.nip05 || '').toLowerCase().includes(t) ||
                            (p.pubkey || '').toLowerCase().startsWith(t);
            if (matches) {
              relayResults.set(p.pubkey, p);
              rebuildBox(Array.from(relayResults.values()));
            }
          },
          eose() {}
        });
        _searchRelaySubId = subId;
      }
    }, 350);
  }

  /* =====================================================================
     NIP-21 CONTENT RENDERING â€” nostr:npub / nprofile / nevent / note
     Parses inline nostr: entities per NIP-21 and renders them as:
     - npub1 / nprofile1 â†’ clickable @mention pill (fetches profile)
     - nevent1 / note1   â†’ embedded quoted note card (fetches event + author)
     ===================================================================== */

  function _decodeNostrEntity(entity) {
    if (!window.NostrTools || !window.NostrTools.nip19) return null;
    try {
      const dec = window.NostrTools.nip19.decode(entity);
      if (!dec) return null;
      if (dec.type === 'npub')    return { type: 'npub',    pubkey: dec.data };
      if (dec.type === 'nprofile') return { type: 'nprofile', pubkey: dec.data.pubkey };
      if (dec.type === 'nevent')  return { type: 'nevent',  eventId: dec.data.id };
      if (dec.type === 'note')    return { type: 'note',    eventId: dec.data };
      return null;
    } catch (_) { return null; }
  }

  function _fetchEventById(eventId) {
    return new Promise((resolve) => {
      if (!eventId || !/^[0-9a-f]{64}$/i.test(eventId)) { resolve(null); return; }
      let done = false;
      const finish = (val) => {
        if (done) return; done = true;
        try { state.pool.unsubscribe(sub); } catch (_) {}
        clearTimeout(timer);
        resolve(val);
      };
      const timer = setTimeout(() => finish(null), 6000);
      const sub = state.pool.subscribe(
        [{ ids: [eventId], limit: 1 }],
        {
          event: (ev) => { if (ev.id === eventId) finish(ev); },
          eose: () => finish(null)
        }
      );
    });
  }

  function _buildMentionPill(pubkey) {
    const pill = document.createElement('span');
    pill.className = 'nostr-mention-pill';
    const known = state.profilesByPubkey.has(pubkey);
    const p = profileFor(pubkey);
    pill.textContent = '@' + (known ? p.name : shortHex(pubkey));
    pill.style.cursor = 'pointer';
    pill.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(pubkey); };
    if (!known) {
      fetchProfileIfNeeded(pubkey).then(() => {
        const fresh = profileFor(pubkey);
        pill.textContent = '@' + (fresh.name || shortHex(pubkey));
      }).catch(() => {});
    }
    return pill;
  }

  function _buildNeventCard(entity) {
    const card = document.createElement('div');
    card.className = 'nevent-embed-card';
    card.textContent = 'Loading quoted noteâ€¦';

    const doLoad = () => {
      const decoded = _decodeNostrEntity(entity);
      if (!decoded || !decoded.eventId) { card.textContent = '[could not parse note reference]'; return; }
      _fetchEventById(decoded.eventId).then((ev) => {
        if (!ev) { card.textContent = '[note not found on connected relays]'; return; }
        return fetchProfileIfNeeded(ev.pubkey).then(() => {
          const p = profileFor(ev.pubkey);
          card.innerHTML = '';

          const header = document.createElement('div');
          header.className = 'nevent-embed-header';
          const av = document.createElement('div');
          av.className = 'nevent-embed-av';
          setAvatarEl(av, p.picture || '', pickAvatar(ev.pubkey));
          const nameSpan = document.createElement('span');
          nameSpan.className = 'nevent-embed-name';
          nameSpan.textContent = p.name || shortHex(ev.pubkey);
          nameSpan.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(ev.pubkey); };
          const timeSpan = document.createElement('span');
          timeSpan.className = 'nevent-embed-time';
          timeSpan.textContent = formatTimeAgo(ev.created_at) + ' ago';
          header.appendChild(av);
          header.appendChild(nameSpan);
          header.appendChild(timeSpan);

          const body = document.createElement('div');
          body.className = 'nevent-embed-body';
          const mediaUrls = extractMediaUrlsFromEvent(ev);
          const previewText = stripMediaUrlsFromText(ev.content || '', mediaUrls);
          body.textContent = previewText.slice(0, 280) + (previewText.length > 280 ? 'â€¦' : '');

          card.appendChild(header);
          card.appendChild(body);
          card.onclick = () => showProfileByPubkey(ev.pubkey);
        });
      }).catch(() => { card.textContent = '[error loading note]'; });
    };

    // If NostrTools isn't ready yet, wait for it
    if (window.NostrTools && window.NostrTools.nip19) {
      doLoad();
    } else {
      ensureNostrTools().then(doLoad).catch(() => { card.textContent = '[error loading note]'; });
    }
    return card;
  }

  // Main content renderer â€” returns a DocumentFragment safe for appending to DOM
  function renderNostrContent(text) {
    const frag = document.createDocumentFragment();
    if (!text) return frag;

    // NIP-21: nostr:<bech32entity>
    const RE = /nostr:(npub1[a-zA-Z0-9]+|nprofile1[a-zA-Z0-9]+|nevent1[a-zA-Z0-9]+|note1[a-zA-Z0-9]+)/g;
    let last = 0;
    let m;
    while ((m = RE.exec(text)) !== null) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const entity = m[1];
      if (entity.startsWith('npub1') || entity.startsWith('nprofile1')) {
        // Decode immediately if NostrTools ready, else async placeholder
        if (window.NostrTools && window.NostrTools.nip19) {
          const decoded = _decodeNostrEntity(entity);
          frag.appendChild(decoded ? _buildMentionPill(decoded.pubkey) : document.createTextNode(m[0]));
        } else {
          const pill = document.createElement('span');
          pill.className = 'nostr-mention-pill';
          pill.textContent = '@' + entity.slice(0, 12) + 'â€¦';
          frag.appendChild(pill);
          ensureNostrTools().then(() => {
            const decoded = _decodeNostrEntity(entity);
            if (decoded && decoded.pubkey) {
              pill.textContent = '@' + (profileFor(decoded.pubkey).name || shortHex(decoded.pubkey));
              pill.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(decoded.pubkey); };
              fetchProfileIfNeeded(decoded.pubkey).then(() => {
                pill.textContent = '@' + (profileFor(decoded.pubkey).name || shortHex(decoded.pubkey));
              }).catch(() => {});
            }
          }).catch(() => {});
        }
      } else if (entity.startsWith('nevent1') || entity.startsWith('note1')) {
        frag.appendChild(_buildNeventCard(entity));
      } else {
        frag.appendChild(document.createTextNode(m[0]));
      }
      last = RE.lastIndex;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    return frag;
  }

  /* ===================================================================== */

  function firstTagValue(tags, key) {
    const found = (tags || []).find((t) => Array.isArray(t) && t[0] === key && t[1]);
    return found ? String(found[1]) : '';
  }

  function allTagValues(tags, key) {
    return (tags || [])
      .filter((t) => Array.isArray(t) && t[0] === key && t[1])
      .map((t) => String(t[1]));
  }

  function formatChatTimestamp(ts) {
    const val = Number(ts || 0);
    if (!val) return '--:--';
    try {
      return new Date(val * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (_) {
      return '--:--';
    }
  }

  function chatReactionKey(messageId, pubkey) {
    return `${messageId}:${pubkey}`;
  }

  function applyChatLikeReaction(messageId, pubkey, reactionEventId) {
    if (!messageId || !pubkey) return;
    if (!state.chatLikePubkeysByMessageId.has(messageId)) {
      state.chatLikePubkeysByMessageId.set(messageId, new Set());
    }
    state.chatLikePubkeysByMessageId.get(messageId).add(pubkey);

    const key = chatReactionKey(messageId, pubkey);
    const prevReactionId = state.chatReactionIdByMessageAndPubkey && state.chatReactionIdByMessageAndPubkey.get(key);
    if (prevReactionId && prevReactionId !== reactionEventId) {
      state.chatReactionEventById.delete(prevReactionId);
    }
    if (!state.chatReactionIdByMessageAndPubkey) state.chatReactionIdByMessageAndPubkey = new Map();
    if (reactionEventId) {
      state.chatReactionIdByMessageAndPubkey.set(key, reactionEventId);
      state.chatReactionEventById.set(reactionEventId, { messageId, pubkey });
    }

    if (state.user && normalizePubkeyHex(state.user.pubkey) === normalizePubkeyHex(pubkey)) {
      if (reactionEventId) state.chatOwnLikeEventByMessageId.set(messageId, reactionEventId);
      else {
        const ownKnown = state.chatReactionIdByMessageAndPubkey.get(key);
        if (ownKnown) state.chatOwnLikeEventByMessageId.set(messageId, ownKnown);
      }
    }
  }

  function applyChatUnlikeByReactionId(reactionEventId) {
    if (!reactionEventId) return;
    const meta = state.chatReactionEventById.get(reactionEventId);
    if (!meta) return;
    state.chatReactionEventById.delete(reactionEventId);
    if (!state.chatReactionIdByMessageAndPubkey) state.chatReactionIdByMessageAndPubkey = new Map();
    const key = chatReactionKey(meta.messageId, meta.pubkey);
    if (state.chatReactionIdByMessageAndPubkey.get(key) === reactionEventId) {
      state.chatReactionIdByMessageAndPubkey.delete(key);
    }

    const set = state.chatLikePubkeysByMessageId.get(meta.messageId);
    if (set) {
      set.delete(meta.pubkey);
      if (!set.size) state.chatLikePubkeysByMessageId.delete(meta.messageId);
    }

    if (state.user && normalizePubkeyHex(state.user.pubkey) === normalizePubkeyHex(meta.pubkey)) {
      const ownReactionId = state.chatOwnLikeEventByMessageId.get(meta.messageId);
      if (ownReactionId === reactionEventId) state.chatOwnLikeEventByMessageId.delete(meta.messageId);
    }
  }

  function updateChatLikeUi(messageId) {
    if (!messageId) return;
    const rows = qsa(`.cmsg[data-msg-id="${CSS.escape(messageId)}"]`);
    if (!rows.length) return;

    const likedBy = state.chatLikePubkeysByMessageId.get(messageId) || new Set();
    const count = likedBy.size;
    const userPubkey = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
    const isLiked = !!(userPubkey && likedBy.has(userPubkey));

    rows.forEach((row) => {
      const btn = qs('.chat-like-btn', row);
      const countEl = qs('.chat-like-count', row);
      if (countEl) countEl.textContent = `${count}`;
      if (btn) {
        btn.classList.toggle('active', isLiked);
        btn.title = isLiked ? 'Unlike' : 'Like';
      }
    });
  }

  function normalizeReactionContentKey(content) {
    const raw = String(content == null ? '' : content).trim();
    if (!raw) return '+';
    const low = raw.toLowerCase();
    if (low === '+' || low === 'like' || raw === '❤' || raw === '❤️') return '+';
    if (low === '-') return '-';
    return raw;
  }

  function parseReactionMeta(content, tags) {
    const key = normalizeReactionContentKey(content);
    if (!key || key === '-') return null;
    if (key === '+') return { key: '+', label: '❤', imageUrl: '', shortcode: '' };

    let imageUrl = '';
    let shortcode = '';
    const match = key.match(/^:([a-z0-9_+\-]{1,64}):$/i);
    if (match) {
      shortcode = match[1];
      const emojiTag = (tags || []).find((t) =>
        Array.isArray(t) &&
        String(t[0] || '').toLowerCase() === 'emoji' &&
        String(t[1] || '').toLowerCase() === shortcode.toLowerCase() &&
        isLikelyUrl(String(t[2] || ''))
      );
      if (emojiTag) imageUrl = String(emojiTag[2] || '').trim();
    }

    return { key, label: key, imageUrl, shortcode };
  }

  function streamReactionUserKey(reactionKey, pubkey) {
    return `${encodeURIComponent(reactionKey || '')}:${normalizePubkeyHex(pubkey || '')}`;
  }

  function ensureStreamReactionSet(reactionKey) {
    if (!state.streamReactionPubkeysByKey.has(reactionKey)) {
      state.streamReactionPubkeysByKey.set(reactionKey, new Set());
    }
    return state.streamReactionPubkeysByKey.get(reactionKey);
  }

  function streamReactionCount(reactionKey) {
    const set = state.streamReactionPubkeysByKey.get(reactionKey);
    return set ? set.size : 0;
  }

  function applyStreamReaction(reactionMeta, pubkey, reactionEventId) {
    if (!reactionMeta || !reactionMeta.key || !pubkey) return;
    const normalizedPubkey = normalizePubkeyHex(pubkey);
    if (!normalizedPubkey) return;

    const key = reactionMeta.key;
    const set = ensureStreamReactionSet(key);
    set.add(normalizedPubkey);

    if (key !== '+' && (reactionMeta.label || reactionMeta.imageUrl)) {
      state.streamReactionMetaByKey.set(key, {
        label: reactionMeta.label || key,
        imageUrl: reactionMeta.imageUrl || '',
        shortcode: reactionMeta.shortcode || ''
      });
    }

    const userKey = streamReactionUserKey(key, normalizedPubkey);
    const prevReactionId = state.streamReactionIdByKeyAndPubkey.get(userKey);
    if (prevReactionId && prevReactionId !== reactionEventId) {
      state.streamReactionEventById.delete(prevReactionId);
    }

    if (reactionEventId) {
      state.streamReactionIdByKeyAndPubkey.set(userKey, reactionEventId);
      state.streamReactionEventById.set(reactionEventId, { reactionKey: key, pubkey: normalizedPubkey });
    }

    const own = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
    const currentAddress = state.selectedStreamAddress;
    if (own && own === normalizedPubkey) {
      if (reactionEventId) state.streamOwnReactionIdByKey.set(key, reactionEventId);
      if (key === '+' && currentAddress) {
        state.likedStreamAddresses.add(currentAddress);
        if (reactionEventId) state.streamLikeEventIdByAddress.set(currentAddress, reactionEventId);
      }
    }
  }

  function removeOwnStreamReactionByKey(reactionKey) {
    const own = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
    if (!own || !reactionKey) return;
    const userKey = streamReactionUserKey(reactionKey, own);
    const reactionId = state.streamReactionIdByKeyAndPubkey.get(userKey);
    if (reactionId) state.streamReactionEventById.delete(reactionId);
    state.streamReactionIdByKeyAndPubkey.delete(userKey);
    state.streamOwnReactionIdByKey.delete(reactionKey);

    const set = state.streamReactionPubkeysByKey.get(reactionKey);
    if (set) {
      set.delete(own);
      if (!set.size) {
        state.streamReactionPubkeysByKey.delete(reactionKey);
        if (reactionKey !== '+') state.streamReactionMetaByKey.delete(reactionKey);
      }
    }

    if (reactionKey === '+') {
      const currentAddress = state.selectedStreamAddress;
      if (currentAddress) {
        state.likedStreamAddresses.delete(currentAddress);
        state.streamLikeEventIdByAddress.delete(currentAddress);
      }
    }
  }

  function removeStreamReactionById(reactionEventId) {
    if (!reactionEventId) return;
    const meta = state.streamReactionEventById.get(reactionEventId);
    if (!meta) return;

    state.streamReactionEventById.delete(reactionEventId);
    const userKey = streamReactionUserKey(meta.reactionKey, meta.pubkey);
    if (state.streamReactionIdByKeyAndPubkey.get(userKey) === reactionEventId) {
      state.streamReactionIdByKeyAndPubkey.delete(userKey);
    }

    const set = state.streamReactionPubkeysByKey.get(meta.reactionKey);
    if (set) {
      set.delete(meta.pubkey);
      if (!set.size) {
        state.streamReactionPubkeysByKey.delete(meta.reactionKey);
        if (meta.reactionKey !== '+') state.streamReactionMetaByKey.delete(meta.reactionKey);
      }
    }

    const own = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
    if (own && own === normalizePubkeyHex(meta.pubkey)) {
      if (state.streamOwnReactionIdByKey.get(meta.reactionKey) === reactionEventId) {
        state.streamOwnReactionIdByKey.delete(meta.reactionKey);
      }
      if (meta.reactionKey === '+') {
        const currentAddress = state.selectedStreamAddress;
        if (currentAddress) {
          state.likedStreamAddresses.delete(currentAddress);
          state.streamLikeEventIdByAddress.delete(currentAddress);
        }
      }
    }
  }

  function renderStreamReactionsUi(stream) {
    const list = qs('#streamEmojiList');
    const likeCounter = qs('#streamLikeCounter');
    const likeBtn = qs('#likeBtn');
    const current = stream || state.streamsByAddress.get(state.selectedStreamAddress);

    if (!current) {
      if (list) list.innerHTML = '';
      if (likeCounter) likeCounter.textContent = '0 likes';
      if (likeBtn) likeBtn.classList.remove('liked');
      return;
    }

    const own = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
    const likeSet = state.streamReactionPubkeysByKey.get('+') || new Set();
    const isLiked = !!(own && likeSet.has(own));
    const likeTotal = likeSet.size;
    if (likeCounter) likeCounter.textContent = `${likeTotal} like${likeTotal === 1 ? '' : 's'}`;
    if (likeBtn) likeBtn.classList.toggle('liked', isLiked || state.likedStreamAddresses.has(current.address));

    if (own && isLiked) state.likedStreamAddresses.add(current.address);

    if (!list) return;
    list.innerHTML = '';
    const entries = Array.from(state.streamReactionPubkeysByKey.entries())
      .filter(([key, set]) => key !== '+' && set && set.size)
      .map(([key, set]) => ({
        key,
        count: set.size,
        active: !!(own && set.has(own)),
        meta: state.streamReactionMetaByKey.get(key) || { label: key, imageUrl: '', shortcode: '' }
      }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.key.localeCompare(b.key);
      });

    entries.forEach((entry) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'stream-emoji-chip' + (entry.active ? ' active' : '');
      chip.title = `${entry.meta.label || entry.key} (${entry.count})`;
      chip.addEventListener('click', () => window.toggleStreamEmojiReaction(entry.key));

      const countEl = document.createElement('span');
      countEl.className = 'stream-emoji-count';
      countEl.textContent = `${entry.count}`;
      chip.appendChild(countEl);

      if (entry.meta.imageUrl) {
        const img = document.createElement('img');
        img.src = entry.meta.imageUrl;
        img.alt = entry.meta.label || entry.key;
        img.loading = 'lazy';
        chip.appendChild(img);
      } else {
        const txt = document.createElement('span');
        txt.textContent = String(entry.meta.label || entry.key).slice(0, 18);
        chip.appendChild(txt);
      }
      list.appendChild(chip);
    });
  }

  async function findOwnStreamReactionIdByKey(stream, reactionKey) {
    if (!state.user || !stream || !state.pool) return '';
    const own = normalizePubkeyHex(state.user.pubkey);
    if (!own) return '';
    const wantedKey = normalizeReactionContentKey(reactionKey);
    if (!wantedKey || wantedKey === '-') return '';

    return new Promise((resolve) => {
      const reactions = new Map();
      const deletedIds = new Set();
      let done = false;
      let subId = null;
      const finish = (id = '') => {
        if (done) return;
        done = true;
        if (subId) {
          try { state.pool.unsubscribe(subId); } catch (_) {}
        }
        resolve(id || '');
      };

      subId = state.pool.subscribe(
        [
          { kinds: [KIND_REACTION], authors: [own], '#e': [stream.id], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30 },
          { kinds: [KIND_REACTION], authors: [own], '#a': [stream.address], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30 },
          { kinds: [KIND_DELETION], authors: [own], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30 }
        ],
        {
          event: (ev) => {
            if (ev.kind === KIND_REACTION) {
              const reaction = parseReactionMeta(ev.content, ev.tags);
              if (!reaction || reaction.key !== wantedKey) return;
              const aTag = firstTagValue(ev.tags, 'a');
              if (aTag && aTag !== stream.address) return;
              const eTag = firstTagValue(ev.tags, 'e');
              if (eTag && eTag !== stream.id) return;
              reactions.set(ev.id, ev);
              return;
            }
            if (ev.kind === KIND_DELETION) {
              allTagValues(ev.tags, 'e').forEach((id) => {
                if (/^[0-9a-f]{64}$/i.test(id)) deletedIds.add(id);
              });
            }
          },
          eose: () => {}
        }
      );

      setTimeout(() => {
        const active = Array.from(reactions.values())
          .filter((ev) => !deletedIds.has(ev.id))
          .sort((a, b) => Number(b.created_at || 0) - Number(a.created_at || 0));
        finish(active.length ? active[0].id : '');
      }, 4500);
    });
  }

  async function findOwnStreamLikeReactionId(stream) {
    return findOwnStreamReactionIdByKey(stream, '+');
  }

  async function findOwnChatLikeReactionId(messageId, stream) {
    if (!state.user || !state.pool || !messageId || !stream) return '';
    const own = normalizePubkeyHex(state.user.pubkey);
    if (!own) return '';

    return new Promise((resolve) => {
      const reactions = new Map();
      const deletedIds = new Set();
      let done = false;
      let subId = null;
      const finish = (id = '') => {
        if (done) return;
        done = true;
        if (subId) {
          try { state.pool.unsubscribe(subId); } catch (_) {}
        }
        resolve(id || '');
      };

      subId = state.pool.subscribe(
        [
          { kinds: [KIND_REACTION], authors: [own], '#e': [messageId], limit: 100, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30 },
          { kinds: [KIND_DELETION], authors: [own], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 30 }
        ],
        {
          event: (ev) => {
            if (ev.kind === KIND_REACTION) {
              const content = (ev.content || '').trim();
              if (content !== '+') return;
              const aTag = firstTagValue(ev.tags, 'a');
              if (aTag && aTag !== stream.address) return;
              reactions.set(ev.id, ev);
              return;
            }
            if (ev.kind === KIND_DELETION) {
              allTagValues(ev.tags, 'e').forEach((id) => {
                if (/^[0-9a-f]{64}$/i.test(id)) deletedIds.add(id);
              });
            }
          },
          eose: () => {}
        }
      );

      setTimeout(() => {
        const active = Array.from(reactions.values())
          .filter((ev) => !deletedIds.has(ev.id))
          .sort((a, b) => Number(b.created_at || 0) - Number(a.created_at || 0));
        finish(active.length ? active[0].id : '');
      }, 4500);
    });
  }

  function postReactionPendingKey(noteId, reactionKey) {
    return `${noteId}:${encodeURIComponent(reactionKey || '')}`;
  }

  async function findOwnPostReactionId(noteId, reactionKey) {
    if (!state.user || !state.pool || !noteId) return '';
    const own = normalizePubkeyHex(state.user.pubkey);
    if (!own) return '';
    const wantedKey = normalizeReactionContentKey(reactionKey);
    if (!wantedKey || wantedKey === '-') return '';

    return new Promise((resolve) => {
      const reactions = new Map();
      const deletedIds = new Set();
      let done = false;
      let subId = null;
      const finish = (id = '') => {
        if (done) return;
        done = true;
        if (subId) {
          try { state.pool.unsubscribe(subId); } catch (_) {}
        }
        resolve(id || '');
      };

      subId = state.pool.subscribe(
        [
          { kinds: [KIND_REACTION], authors: [own], '#e': [noteId], limit: 100, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 90 },
          { kinds: [KIND_DELETION], authors: [own], limit: 120, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 90 }
        ],
        {
          event: (ev) => {
            if (ev.kind === KIND_REACTION) {
              const reaction = parseReactionMeta(ev.content, ev.tags);
              if (!reaction || reaction.key !== wantedKey) return;
              const eTag = firstTagValue(ev.tags, 'e');
              if (eTag && eTag !== noteId) return;
              reactions.set(ev.id, ev);
              return;
            }
            if (ev.kind === KIND_DELETION) {
              allTagValues(ev.tags, 'e').forEach((id) => {
                if (/^[0-9a-f]{64}$/i.test(id)) deletedIds.add(id);
              });
            }
          },
          eose: () => {}
        }
      );

      setTimeout(() => {
        const active = Array.from(reactions.values())
          .filter((ev) => !deletedIds.has(ev.id))
          .sort((a, b) => Number(b.created_at || 0) - Number(a.created_at || 0));
        finish(active.length ? active[0].id : '');
      }, 4500);
    });
  }

  function reactionMetaFromPicker(codeInput, urlInput = '') {
    const code = String(codeInput || '').trim();
    if (!code) return null;
    const url = String(urlInput || '').trim();
    const tagList = [];
    const shortMatch = code.match(/^:([a-z0-9_+\-]{1,64}):$/i);
    if (shortMatch && isLikelyUrl(url)) {
      tagList.push(['emoji', shortMatch[1], url]);
    }
    const meta = parseReactionMeta(code, tagList);
    if (!meta) return null;
    if (shortMatch && isLikelyUrl(url)) {
      meta.shortcode = shortMatch[1];
      meta.imageUrl = url;
    }
    return meta;
  }

  function defaultReactionPickerOptions() {
    const out = [];
    const seen = new Set();
    ['❤', '🔥', '👏', '⚡', '😂', '😮', '🚀', '🤙'].forEach((val) => {
      const meta = reactionMetaFromPicker(val, '');
      if (!meta || seen.has(meta.key)) return;
      seen.add(meta.key);
      out.push(meta);
    });
    state.streamReactionMetaByKey.forEach((meta, key) => {
      if (!key || key === '+' || seen.has(key)) return;
      seen.add(key);
      out.push({
        key,
        label: meta && meta.label ? meta.label : key,
        imageUrl: meta && meta.imageUrl ? meta.imageUrl : '',
        shortcode: meta && meta.shortcode ? meta.shortcode : ''
      });
    });
    return out.slice(0, 30);
  }

  async function toggleStreamReactionByMeta(reactionMeta) {
    const stream = state.streamsByAddress.get(state.selectedStreamAddress);
    if (!stream || !reactionMeta || !reactionMeta.key) return;
    if (!state.user) { window.openLogin(); return; }
    const own = normalizePubkeyHex(state.user.pubkey);
    if (!own) return;

    const reactionKey = reactionMeta.key;
    if (state.streamReactionPublishPendingByKey.has(reactionKey)) return;
    state.streamReactionPublishPendingByKey.add(reactionKey);

    const userKey = streamReactionUserKey(reactionKey, own);
    const activeSet = state.streamReactionPubkeysByKey.get(reactionKey) || new Set();
    const wasActive = activeSet.has(own);
    let knownReactionId = state.streamReactionIdByKeyAndPubkey.get(userKey) || state.streamOwnReactionIdByKey.get(reactionKey) || '';

    try {
      if (wasActive) {
        if (!knownReactionId) {
          knownReactionId = await findOwnStreamReactionIdByKey(stream, reactionKey);
        }

        removeOwnStreamReactionByKey(reactionKey);
        renderStreamReactionsUi(stream);

        if (knownReactionId) {
          await signAndPublish(KIND_DELETION, 'removed stream reaction', [['e', knownReactionId], ['k', String(KIND_REACTION)], ['a', stream.address]]);
          removeStreamReactionById(knownReactionId);
        } else if (reactionKey === '+') {
          await signAndPublish(KIND_REACTION, '-', [['e', stream.id], ['p', stream.pubkey], ['a', stream.address]]);
        } else {
          throw new Error('Could not find your existing reaction to remove yet. Try again.');
        }
      } else {
        const tags = [['e', stream.id], ['p', stream.pubkey], ['a', stream.address]];
        if (reactionMeta.shortcode && reactionMeta.imageUrl) {
          tags.push(['emoji', reactionMeta.shortcode, reactionMeta.imageUrl]);
        }
        const signed = await signAndPublish(KIND_REACTION, reactionKey, tags);
        applyStreamReaction(reactionMeta, own, signed && signed.id ? signed.id : '');
      }
      renderStreamReactionsUi(stream);
    } catch (err) {
      if (wasActive) {
        applyStreamReaction(reactionMeta, own, knownReactionId || '');
      } else {
        removeOwnStreamReactionByKey(reactionKey);
      }
      renderStreamReactionsUi(stream);
      alert(err && err.message ? err.message : 'Failed to update reaction.');
    } finally {
      state.streamReactionPublishPendingByKey.delete(reactionKey);
    }
  }

  async function togglePostReactionByMeta(noteId, notePubkey, profilePubkey, reactionMeta) {
    if (!noteId || !reactionMeta || !reactionMeta.key) return;
    if (!state.user) { window.openLogin(); return; }
    const pendingKey = postReactionPendingKey(noteId, reactionMeta.key);
    if (state.postReactionPublishPendingByNoteAndKey.has(pendingKey)) return;
    state.postReactionPublishPendingByNoteAndKey.add(pendingKey);

    try {
      const existingReactionId = await findOwnPostReactionId(noteId, reactionMeta.key);
      const map = state.profileNotesByPubkey.get(profilePubkey) || new Map();

      if (existingReactionId) {
        const delTags = [['e', existingReactionId], ['k', String(KIND_REACTION)], ['p', notePubkey]];
        const deletion = await signAndPublish(KIND_DELETION, 'removed post reaction', delTags);
        if (deletion && deletion.id) map.set(deletion.id, deletion);
      } else {
        const tags = [['e', noteId], ['p', notePubkey]];
        if (reactionMeta.shortcode && reactionMeta.imageUrl) {
          tags.push(['emoji', reactionMeta.shortcode, reactionMeta.imageUrl]);
        }
        const signed = await signAndPublish(KIND_REACTION, reactionMeta.key, tags);
        if (signed && signed.id) map.set(signed.id, signed);
      }

      state.profileNotesByPubkey.set(profilePubkey, map);
      renderProfileFeed(profilePubkey);
    } catch (err) {
      alert(err && err.message ? err.message : 'Failed to update post reaction.');
    } finally {
      state.postReactionPublishPendingByNoteAndKey.delete(pendingKey);
    }
  }

  function renderChatInlineMedia(container, mediaUrls) {
    if (!container || !Array.isArray(mediaUrls) || !mediaUrls.length) return;
    const wrap = document.createElement('div');
    wrap.className = 'chat-media-wrap';
    if (mediaUrls.length === 1) wrap.classList.add('single');
    mediaUrls.slice(0, 4).forEach((url) => {
      const a = document.createElement('a');
      a.className = 'chat-media-item' + (mediaUrls.length === 1 ? ' single' : '');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Chat image';
      img.loading = 'lazy';
      img.addEventListener('error', () => { a.remove(); });
      a.appendChild(img);
      wrap.appendChild(a);
    });
    if (wrap.children.length) container.appendChild(wrap);
  }

  function renderChatMessage(ev) {
    const sc = qs('#chatScroll');
    if (!sc) return;
    state.chatMessageEventsById.set(ev.id, ev);
    const p = profileFor(ev.pubkey);
    const row = document.createElement('div');
    row.className = 'cmsg';
    row.dataset.pubkey = ev.pubkey;
    row.dataset.msgId = ev.id;
    row.innerHTML = `<div class="c-av"></div><div class="c-body"><div class="c-name-row"><span class="c-name"></span><span class="c-time"></span></div><div class="c-text"></div></div><div class="chat-msg-actions"><button class="cma-btn like-cma chat-like-btn" title="Like">❤ <span class="chat-like-count">0</span></button></div>`;
    const avEl = qs('.c-av', row);
    setAvatarEl(avEl, p.picture || '', pickAvatar(ev.pubkey));
    const chatNip05 = getVerifiedNip05ForPubkey(ev.pubkey, p.nip05 || '');
    if (chatNip05) avEl.classList.add('nip05-square');
    else if (normalizeNip05Value(p.nip05 || '')) ensureNip05Verification(ev.pubkey, p.nip05 || '').catch(() => {});
    avEl.onclick = () => showProfileByPubkey(ev.pubkey);
    const nameEl = qs('.c-name', row);
    nameEl.textContent = state.profilesByPubkey.has(ev.pubkey) ? p.name : shortHex(ev.pubkey);
    nameEl.onclick = () => showProfileByPubkey(ev.pubkey);
    const timeEl = qs('.c-time', row);
    if (timeEl) {
      timeEl.textContent = formatChatTimestamp(ev.created_at);
      try { timeEl.title = new Date(Number(ev.created_at || 0) * 1000).toLocaleString(); } catch (_) {}
    }
    const ctext = qs('.c-text', row);
    const rawText = String(ev.content || '');
    const mediaUrls = Array.from(new Set(
      extractHttpUrls(rawText)
        .map((u) => sanitizeMediaUrl(u))
        .filter((u) => classifyMediaUrl(u) === 'photo')
    ));
    const renderText = mediaUrls.length ? stripMediaUrlsFromText(rawText, mediaUrls) : rawText;
    if (renderText) ctext.appendChild(renderNostrContent(renderText));
    renderChatInlineMedia(ctext, mediaUrls);
    const likeBtn = qs('.chat-like-btn', row);
    if (likeBtn) likeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.toggleChatLikeMessage(ev.id);
    });
    sc.appendChild(row);
    updateChatLikeUi(ev.id);
    sc.scrollTop = sc.scrollHeight;
    while (sc.children.length > 120) sc.removeChild(sc.firstChild);
  }

  function setLoggedInUi(on) {
    const out = qs('#navLoggedOut');
    const inn = qs('#navLoggedIn');
    if (out) out.classList.toggle('off', on);
    if (inn) inn.classList.toggle('on', on);
  }

  function setUserUi() {
    if (!state.user) {
      setLoggedInUi(false);
      renderFollowingCount();
      updateGoLiveButtonState();
      if (window.SifakaCommunities && typeof window.SifakaCommunities.refreshContext === 'function') {
        window.SifakaCommunities.refreshContext();
      }
      return;
    }
    setLoggedInUi(true);
    const p = state.user.profile || { name: shortHex(state.user.pubkey), nip05: '' };
    const claimedNip05 = normalizeNip05Value(p.nip05 || '');
    const verifiedNip05 = getVerifiedNip05ForPubkey(state.user.pubkey, claimedNip05);
    if (claimedNip05 && !verifiedNip05) ensureNip05Verification(state.user.pubkey, claimedNip05).catch(() => {});
    const av = pickAvatar(state.user.pubkey);
    const pic = (p.picture || '').trim();
    const navAvatar = qs('#navAvatar');
    const navName = qs('#navDisplayName');
    const pdAv = qs('#pdAvLg');
    const pdName = qs('#pdName');
    const pdSub = qs('#pdSub');
    const navBadge = qs('#navNip05Badge');
    const pdBadge = qs('#pdBadge');

    if (navAvatar) setAvatarEl(navAvatar, pic, av);
    if (pdAv) setAvatarEl(pdAv, pic, av);
    if (navName) navName.textContent = p.name;
    if (pdName) pdName.childNodes[0].textContent = `${p.name} `;
    if (pdSub) {
      const base = verifiedNip05 || (claimedNip05 ? `${claimedNip05} (unverified)` : shortHex(state.user.pubkey));
      pdSub.textContent = state.authMode === 'local' ? `${base} (local key)` : base;
    }
    if (navBadge) navBadge.style.display = verifiedNip05 ? 'inline' : 'none';
    if (pdBadge) pdBadge.style.display = verifiedNip05 ? 'inline' : 'none';

    // Apply NIP-05 square glow to nav/dropdown avatars
    if (navAvatar) navAvatar.classList.toggle('nip05-square', !!verifiedNip05);
    if (pdAv) pdAv.classList.toggle('nip05-square', !!verifiedNip05);

    // Load user's contact list + NIP-51 people lists for the filter dropdown
    subscribeUserLists(state.user.pubkey);
    renderFollowingCount();
    updateGoLiveButtonState();
    if (window.SifakaCommunities && typeof window.SifakaCommunities.refreshContext === 'function') {
      window.SifakaCommunities.refreshContext();
    }
  }

  function subscribeProfiles(pubkeys) {
    // Always include the logged-in user so their profile isn't lost when other fetches fire
    const allKeys = [...pubkeys];
    if (state.user && state.user.pubkey && !allKeys.includes(state.user.pubkey)) {
      allKeys.unshift(state.user.pubkey);
    }
    const unique = [...new Set(allKeys)];
    if (!unique.length) return;
    if (state.profileSubId) state.pool.unsubscribe(state.profileSubId);
    state.profileSubId = state.pool.subscribe(
      [{ kinds: [KIND_PROFILE], authors: unique, limit: unique.length * 2 }],
      {
        event: (ev) => {
          if (ev.kind !== KIND_PROFILE) return;
          const parsed = parseProfile(ev);
          state.profilesByPubkey.set(ev.pubkey, parsed);
          ensureNip05Verification(ev.pubkey, parsed.nip05 || '').catch(() => {});
          if (state.user && state.user.pubkey === ev.pubkey) {
            state.user.profile = state.profilesByPubkey.get(ev.pubkey);
            setUserUi();
          }
          renderLiveGrid();
          const sel = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
          if (sel) renderVideo(sel);
          if (state.selectedProfilePubkey === ev.pubkey) {
            renderProfilePage(ev.pubkey);
            syncProfileRoute(ev.pubkey, 'replace');
          }
        }
      }
    );
  }

  // Fetch a single profile on demand (commenters, repost authors, etc.)
  function fetchProfileIfNeeded(pubkey) {
    if (!pubkey) return Promise.resolve();
    const existing = state.profilesByPubkey.get(pubkey);
    if (existing && (existing.name || existing.display_name || existing.picture)) return Promise.resolve();
    return new Promise((resolve) => {
      const sub = state.pool.subscribe(
        [{ kinds: [KIND_PROFILE], authors: [pubkey], limit: 1 }],
        {
          event: (ev) => {
            if (ev.kind !== KIND_PROFILE || ev.pubkey !== pubkey) return;
            const parsed = parseProfile(ev);
            state.profilesByPubkey.set(pubkey, parsed);
            ensureNip05Verification(pubkey, parsed.nip05 || '').catch(() => {});
          },
          eose: () => { try { state.pool.unsubscribe(sub); } catch (_) {} resolve(); }
        }
      );
    });
  }

  function subscribeLive() {
    if (state.liveSubId) state.pool.unsubscribe(state.liveSubId);

    let liveGridTimer = null;
    const debouncedRenderGrid = () => {
      clearTimeout(liveGridTimer);
      liveGridTimer = setTimeout(renderLiveGrid, 300);
    };

    state.liveSubId = state.pool.subscribe(
      [{ kinds: [KIND_LIVE_EVENT], limit: 200, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 7 }],
      {
        event: (ev) => {
          const stream = parseLiveEvent(ev);
          upsertStream(stream);
          if (state.pendingRouteAddress && stream.address === state.pendingRouteAddress) {
            tryOpenPendingRouteStream();
          }
          debouncedRenderGrid();
        },
        eose: () => {
          renderLiveGrid();
          tryOpenPendingRouteStream();
          if (!state.featuredCycleTimer) startHeroCycle();
          const streams = sortedLiveStreams();
          // Fetch profiles for both the event publisher AND actual streamer
          const pubSet = new Set();
          streams.forEach((s) => { pubSet.add(s.pubkey); if (s.hostPubkey) pubSet.add(s.hostPubkey); });
          subscribeProfiles(Array.from(pubSet));
          if (state.selectedProfilePubkey) renderProfilePage(state.selectedProfilePubkey);
        }
      }
    );
  }

  function subscribeChat(stream) {
    if (!stream) return;
    if (state.chatSubId) state.pool.unsubscribe(state.chatSubId);
    if (state.chatReactionSubId) { try { state.pool.unsubscribe(state.chatReactionSubId); } catch (_) {} state.chatReactionSubId = null; }
    if (state._chatProfileSubId) { try { state.pool.unsubscribe(state._chatProfileSubId); } catch (_) {} state._chatProfileSubId = null; }
    const sc = qs('#chatScroll');
    if (sc) sc.innerHTML = '';
    state.chatLikePubkeysByMessageId = new Map();
    state.chatReactionIdByMessageAndPubkey = new Map();
    state.chatReactionEventById = new Map();
    state.chatOwnLikeEventByMessageId = new Map();
    state.chatMessageEventsById = new Map();
    state.chatLikePublishPendingByMessageId = new Set();
    state.streamReactionPubkeysByKey = new Map();
    state.streamReactionMetaByKey = new Map();
    state.streamReactionIdByKeyAndPubkey = new Map();
    state.streamReactionEventById = new Map();
    state.streamOwnReactionIdByKey = new Map();
    state.streamReactionPublishPendingByKey = new Set();
    renderStreamReactionsUi(stream);

    const seenIds = new Set();
    const unknownPubkeys = new Set(); // pubkeys seen in chat but not yet in profile cache

    // Called after EOSE and also for each new real-time message
    function fetchMissingChatProfiles() {
      if (!unknownPubkeys.size) return;
      const toFetch = Array.from(unknownPubkeys).filter((pk) => !state.profilesByPubkey.has(pk));
      unknownPubkeys.clear();
      if (!toFetch.length) return;

      if (state._chatProfileSubId) { try { state.pool.unsubscribe(state._chatProfileSubId); } catch (_) {} }
      state._chatProfileSubId = state.pool.subscribe(
        [{ kinds: [KIND_PROFILE], authors: toFetch, limit: toFetch.length * 2 }],
        {
          event: (profileEv) => {
            if (profileEv.kind !== KIND_PROFILE) return;
            const p = parseProfile(profileEv);
            state.profilesByPubkey.set(profileEv.pubkey, p);
            ensureNip05Verification(profileEv.pubkey, p.nip05 || '').catch(() => {});
            // Update all chat rows for this pubkey
            const chatEl = qs('#chatScroll');
            if (!chatEl) return;
            chatEl.querySelectorAll(`.cmsg[data-pubkey="${CSS.escape(profileEv.pubkey)}"]`).forEach((row) => {
              const avEl = row.querySelector('.c-av');
              const nameEl = row.querySelector('.c-name');
              if (avEl) {
                setAvatarEl(avEl, p.picture || '', pickAvatar(profileEv.pubkey));
                const verified = !!getVerifiedNip05ForPubkey(profileEv.pubkey, p.nip05 || '');
                avEl.classList.toggle('nip05-square', verified);
              }
              if (nameEl) nameEl.textContent = p.name || shortHex(profileEv.pubkey);
            });
          },
          eose: () => { try { state.pool.unsubscribe(state._chatProfileSubId); } catch (_) {} state._chatProfileSubId = null; }
        }
      );
    }

    const filters = [{
      kinds: [KIND_LIVE_CHAT],
      '#a': [stream.address],
      limit: 200,
      since: Math.floor(Date.now() / 1000) - 60 * 60 * 8
    }];

    state.chatSubId = state.pool.subscribe(filters, {
      event: (ev) => {
        if (!ev || !ev.id) return;
        if (seenIds.has(ev.id)) return;
        seenIds.add(ev.id);
        renderChatMessage(ev);
        // Queue profile fetch for unknown sender
        if (!state.profilesByPubkey.has(ev.pubkey)) unknownPubkeys.add(ev.pubkey);
      },
      eose: () => {
        // Batch-fetch all profiles we saw during history replay
        fetchMissingChatProfiles();
      }
    });

    state.chatReactionSubId = state.pool.subscribe(
      [{ kinds: [KIND_REACTION, KIND_DELETION], '#a': [stream.address], limit: 1200, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 }],
      {
        event: (ev) => {
          if (!ev || !ev.id) return;

          if (ev.kind === KIND_REACTION) {
            const targetId = firstTagValue(ev.tags, 'e');
            if (!/^[0-9a-f]{64}$/i.test(targetId || '')) return;
            if (targetId === stream.id) {
              const reactionMeta = parseReactionMeta(ev.content, ev.tags);
              if (!reactionMeta) return;
              applyStreamReaction(reactionMeta, normalizePubkeyHex(ev.pubkey), ev.id);
              renderStreamReactionsUi(stream);
              return;
            }
            const kTag = firstTagValue(ev.tags, 'k');
            if (kTag && kTag !== String(KIND_LIVE_CHAT)) return;
            const reactionContent = (ev.content || '').trim();
            if (!reactionContent || reactionContent === '-') return;
            applyChatLikeReaction(targetId, normalizePubkeyHex(ev.pubkey), ev.id);
            updateChatLikeUi(targetId);
            return;
          }

          if (ev.kind === KIND_DELETION) {
            const deletedIds = allTagValues(ev.tags, 'e').filter((id) => /^[0-9a-f]{64}$/i.test(id));
            deletedIds.forEach((rid) => {
              const streamReactionMeta = state.streamReactionEventById.get(rid);
              if (streamReactionMeta) {
                removeStreamReactionById(rid);
                renderStreamReactionsUi(stream);
              }
              const meta = state.chatReactionEventById.get(rid);
              applyChatUnlikeByReactionId(rid);
              if (meta && meta.messageId) updateChatLikeUi(meta.messageId);
            });
          }
        }
      }
    );
  }

  function openStream(address, opts = {}) {
    const routeMode = opts.routeMode || 'push';
    const stream = state.streamsByAddress.get(address);
    if (!stream) return;
    state.pendingRouteAddress = '';
    state.pendingRouteNaddr = '';
    state.selectedStreamAddress = address;
    if (routeMode !== 'skip') syncTheaterRoute(stream, routeMode);
    renderVideo(stream);
    subscribeChat(stream);
    window.showVideoPage();
  }

    function clearProfilePlayback() {
    state.profilePlaybackToken += 1;
    if (state.profileHlsInstance) {
      try {
        state.profileHlsInstance.destroy();
      } catch (_) {
        // no-op
      }
      state.profileHlsInstance = null;
    }
  }

  function renderProfilePlaybackFallback(message, url) {
    const host = qs('#profileLivePlayer');
    if (!host) return;
    host.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;width:100%;height:100%;padding:.9rem;text-align:center;';

    const msg = document.createElement('div');
    msg.style.cssText = 'font-size:.78rem;color:var(--text2);line-height:1.5;';
    msg.textContent = message;
    wrap.appendChild(msg);

    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Open stream URL';
      link.style.cssText = 'font-family:"DM Mono",monospace;color:var(--zap);font-size:.7rem;text-decoration:none;';
      wrap.appendChild(link);
    }

    host.appendChild(wrap);
  }

  async function renderProfileLivePlayback(stream) {
    clearProfilePlayback();

    const host = qs('#profileLivePlayer');
    if (!host) return;
    const url = (stream.streaming || '').trim();

    if (!url || !/^https?:\/\//i.test(url)) {
      renderProfilePlaybackFallback('Live stream metadata is available, but no browser-playable URL was found.', url);
      return;
    }

    const token = state.profilePlaybackToken;
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.muted = false;
    video.defaultMuted = false;
    video.playsInline = true;
    video.style.cssText = 'width:100%;height:100%;object-fit:cover;background:#000;';
    host.innerHTML = '';
    host.appendChild(video);

    video.addEventListener('error', () => {
      if (token !== state.profilePlaybackToken) return;
      renderProfilePlaybackFallback('Profile live playback failed in this browser.', url);
    });

    const isHlsUrl = /\.m3u8($|\?)/i.test(url);
    if (isHlsUrl) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else {
        try {
          const Hls = await ensureHlsJs();
          if (token !== state.profilePlaybackToken) return;
          if (!Hls.isSupported()) {
            renderProfilePlaybackFallback('HLS is not supported in this browser.', url);
            return;
          }

          const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          state.profileHlsInstance = hls;
          hls.loadSource(url);
          hls.attachMedia(video);
          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (data && data.fatal && token === state.profilePlaybackToken) {
              renderProfilePlaybackFallback('HLS playback failed. Open stream directly instead.', url);
            }
          });
        } catch (_) {
          renderProfilePlaybackFallback('Could not load HLS playback library.', url);
          return;
        }
      }
    } else {
      video.src = url;
    }

    try {
      await video.play();
    } catch (_) {
      try {
        video.muted = true;
        await video.play();
      } catch (_) {
        // user gesture may still be required
      }
    }
  }

  function getLatestLiveByPubkey(pubkey) {
    return Array.from(state.streamsByAddress.values())
      .filter((s) => (s.pubkey === pubkey || s.hostPubkey === pubkey) && s.status === 'live')
      .sort((a, b) => (b.created_at || 0) - (a.created_at || 0))[0] || null;
  }


  function getTagValues(ev, key) {
    const values = [];
    (ev && Array.isArray(ev.tags) ? ev.tags : []).forEach((tag) => {
      if (Array.isArray(tag) && tag[0] === key && tag[1]) values.push(tag[1]);
    });
    return values;
  }

  function isTopLevelProfilePost(ev, pubkey) {
    if (!ev || ev.kind !== 1 || ev.pubkey !== pubkey) return false;
    return getTagValues(ev, 'e').length === 0;
  }

  function pickReferencedPostId(ev, postIdSet) {
    const refs = getTagValues(ev, 'e');
    for (let i = refs.length - 1; i >= 0; i -= 1) {
      if (postIdSet.has(refs[i])) return refs[i];
    }
    return '';
  }

  function classifyReactionContent(content) {
    const val = String(content || '').trim().toLowerCase();
    if (!val || val === '+' || val === 'like' || val === '?' || val === '??' || val === '??') return 'like';
    return 'emoji';
  }

  function buildProfilePostAggregates(pubkey, posts) {
    const map = state.profileNotesByPubkey.get(pubkey) || new Map();
    const postIdSet = new Set(posts.map((p) => p.id));
    const statsByPost = new Map();
    const commentsByPost = new Map();
    const likePubkeysByPost = new Map();
    const emojiByPost = new Map();

    posts.forEach((post) => {
      statsByPost.set(post.id, { likes: 0, emoji: 0, boosts: 0, zaps: 0 });
      commentsByPost.set(post.id, []);
      likePubkeysByPost.set(post.id, new Set());
      emojiByPost.set(post.id, new Map());
    });

    const deletedIds = new Set();
    map.forEach((ev) => {
      if (!ev || ev.kind !== KIND_DELETION) return;
      allTagValues(ev.tags, 'e').forEach((id) => {
        if (/^[0-9a-f]{64}$/i.test(id)) deletedIds.add(id);
      });
    });

    map.forEach((ev) => {
      if (!ev || !ev.id) return;
      if (deletedIds.has(ev.id)) return;
      const ref = pickReferencedPostId(ev, postIdSet);
      if (!ref) return;

      const stats = statsByPost.get(ref);
      if (!stats) return;

      if (ev.kind === 6) {
        stats.boosts += 1;
        return;
      }

      if (ev.kind === KIND_REACTION) {
        const reaction = parseReactionMeta(ev.content, ev.tags);
        if (!reaction) return;
        if (reaction.key === '+') {
          likePubkeysByPost.get(ref).add(ev.pubkey);
        } else {
          const perPost = emojiByPost.get(ref);
          if (!perPost.has(reaction.key)) {
            perPost.set(reaction.key, {
              key: reaction.key,
              label: reaction.label || reaction.key,
              imageUrl: reaction.imageUrl || '',
              shortcode: reaction.shortcode || '',
              pubkeys: new Set()
            });
          }
          const row = perPost.get(reaction.key);
          row.pubkeys.add(ev.pubkey);
          if (!row.imageUrl && reaction.imageUrl) row.imageUrl = reaction.imageUrl;
        }
        return;
      }

      if (ev.kind === KIND_ZAP_RECEIPT) {
        stats.zaps += 1;
        return;
      }

      if (ev.kind === 1 && !isTopLevelProfilePost(ev, pubkey)) {
        const list = commentsByPost.get(ref);
        if (list) list.push(ev);
      }
    });

    commentsByPost.forEach((list) => {
      list.sort((a, b) => (a.created_at || 0) - (b.created_at || 0));
    });

    posts.forEach((post) => {
      const stats = statsByPost.get(post.id);
      if (!stats) return;
      const likeSet = likePubkeysByPost.get(post.id) || new Set();
      stats.likes = likeSet.size;
      const emojiMap = emojiByPost.get(post.id) || new Map();
      let emojiTotal = 0;
      emojiMap.forEach((entry) => { emojiTotal += entry.pubkeys.size; });
      stats.emoji = emojiTotal;
    });

    return { statsByPost, commentsByPost, likePubkeysByPost, emojiByPost };
  }

  function stripMediaUrlsFromText(text, mediaUrls) {
    let out = String(text || '');
    mediaUrls.forEach((url) => {
      out = out.split(url).join(' ');
    });
    return out
      .replace(/[ \t]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+\n/g, '\n')
      .trim();
  }

  function renderPostMedia(container, mediaItems) {
    if (!container || !mediaItems.length) return;
    container.classList.add('profile-feed-media');

    const photos = mediaItems.filter((m) => m.kind === 'photo');
    const videos = mediaItems.filter((m) => m.kind === 'video');

    // Single photo: span full width; multiple: 3-col square grid (CSS handles it)
    if (photos.length === 1 && videos.length === 0) container.classList.add('one');

    // Photos â€” square aspect-ratio 1:1 via CSS .profile-feed-photo
    photos.slice(0, 6).forEach((m) => {
      const link = document.createElement('a');
      link.className = 'profile-feed-photo';
      link.href = m.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const img = document.createElement('img');
      img.src = m.url;
      img.alt = 'Post image';
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        link.classList.add('broken');
        link.innerHTML = '<span>Open image</span>';
      });
      link.appendChild(img);
      container.appendChild(link);
    });

    // Videos â€” 16:9 YouTube-style, spans full grid row via CSS grid-column:1/-1
    videos.slice(0, 2).forEach((m) => {
      const frame = document.createElement('div');
      frame.className = 'profile-feed-video';
      const isHls = /\.m3u8($|\?)/i.test(m.url);
      if (isHls) {
        const v = document.createElement('video');
        v.controls = true; v.playsInline = true; v.preload = 'metadata';
        v.style.cssText = 'width:100%;height:100%;max-height:320px;object-fit:contain;display:block;background:#000;';
        frame.appendChild(v);
        (async () => {
          if (v.canPlayType('application/vnd.apple.mpegurl')) {
            v.src = m.url;
          } else {
            try {
              const Hls = await ensureHlsJs();
              if (Hls.isSupported()) {
                const hls = new Hls({ enableWorker: true });
                hls.loadSource(m.url); hls.attachMedia(v);
                hls.on(Hls.Events.ERROR, (_e, data) => {
                  if (data && data.fatal) {
                    hls.destroy();
                    const a = document.createElement('a');
                    a.href = m.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
                    a.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;min-height:80px;color:var(--zap);font-size:.74rem;font-weight:600;text-decoration:none;padding:.75rem;';
                    a.textContent = '▶ Open HLS stream';
                    if (v.parentNode) v.parentNode.replaceChild(a, v);
                  }
                });
              }
            } catch (_) {}
          }
        })();
      } else {
        const v = document.createElement('video');
        v.controls = true; v.playsInline = true; v.preload = 'metadata';
        v.style.cssText = 'width:100%;height:100%;max-height:320px;object-fit:contain;display:block;background:#000;';
        v.src = m.url;
        v.addEventListener('error', () => {
          const fallback = document.createElement('a');
          fallback.href = m.url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer';
          fallback.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;min-height:80px;color:var(--zap);font-size:.74rem;font-weight:600;text-decoration:none;padding:.75rem;';
          fallback.textContent = '▶ Open Video';
          if (v.parentNode) v.parentNode.replaceChild(fallback, v);
        });
        frame.appendChild(v);
      }
      container.appendChild(frame);
    });
  }
  function renderProfileFeedInto(listEl, notes, profile, pubkey, aggregates) {
    if (!listEl) return;

    // Infinite scroll: honour per-element limit stored in data attribute
    const limit = parseInt(listEl.dataset.feedLimit || '15', 10);

    if (!notes.length) {
      listEl.innerHTML = '<div class="profile-feed-empty">No notes found yet for this profile.</div>';
      return;
    }

    listEl.innerHTML = '';
    notes.slice(0, limit).forEach((note) => {
      const isRepost = note.kind === 6;
      const item = document.createElement('div');
      item.className = 'profile-feed-item';

      // For reposts, try to parse the original note from content (NIP-18)
      let originalNote = null;
      let originalPubkey = null;
      if (isRepost) {
        try {
          if (note.content && note.content.trim().startsWith('{')) {
            originalNote = JSON.parse(note.content);
            originalPubkey = originalNote.pubkey;
          }
        } catch (_) {}
        if (!originalPubkey) {
          const pTag = (note.tags || []).find(t => t[0] === 'p');
          if (pTag) originalPubkey = pTag[1];
        }
      }

      const originalProfile = (isRepost && originalPubkey) ? profileFor(originalPubkey) : null;
      const boostBanner = isRepost
        ? `<div class="pf-boost-banner"><span class="pf-boost-icon">🔁</span><span class="pf-boost-label">${profile.display_name || profile.name || 'User'} boosted</span></div>`
        : '';

      item.innerHTML = `${boostBanner}
        <div class="profile-feed-head">
          <div class="profile-feed-author">
            <div class="profile-feed-av"></div>
            <div class="profile-feed-meta"><div class="profile-feed-name"></div><div class="profile-feed-status"></div></div>
          </div>
          <div class="profile-feed-time"></div>
        </div>
        <div class="profile-feed-text"></div>
        <div class="profile-feed-media-wrap"></div>
        <div class="profile-feed-stats">
          <span class="pfs pfs-comments"><strong>0</strong> Comments</span>
          <button class="pfs pfs-btn profile-post-like-btn" type="button"><strong>0</strong> Likes</button>
          <span class="pfs pfs-zaps"><strong>0</strong> Zaps</span>
          <span class="pfs pfs-boosts"><strong>0</strong> Boosts</span>
          <button class="pfs pfs-btn pfs-plus profile-post-emoji-btn" type="button" title="React with custom emoji">+</button>
        </div>
        <div class="profile-feed-emoji-bar"></div>
        <div class="profile-feed-comments"></div>
        <div class="profile-comment-form">
          <textarea class="profile-comment-input" rows="1" placeholder="Write a comment..."></textarea>
          <button class="profile-comment-btn">Comment</button>
        </div>`;

      // For reposts show original author; for regular posts show profile author
      const displayProfile = (isRepost && originalProfile) ? originalProfile : profile;
      const displayNote = (isRepost && originalNote) ? originalNote : note;
      const displayPubkey = (isRepost && originalPubkey) ? originalPubkey : note.pubkey;

      const avEl = qs('.profile-feed-av', item);
      setAvatarEl(avEl, displayProfile.picture || '', pickAvatar(displayPubkey));
      const displayVerifiedNip05 = getVerifiedNip05ForPubkey(displayPubkey, displayProfile.nip05 || '');
      if (avEl && displayVerifiedNip05) avEl.classList.add('nip05-square');
      else if (normalizeNip05Value(displayProfile.nip05 || '')) ensureNip05Verification(displayPubkey, displayProfile.nip05 || '').catch(() => {});
      if (avEl) { avEl.style.cursor = 'pointer'; avEl.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(displayPubkey); }; }
      const nameEl = qs('.profile-feed-name', item);
      if (nameEl) {
        nameEl.textContent = displayProfile.name || shortHex(displayPubkey);
        nameEl.style.cursor = 'pointer';
        nameEl.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(displayPubkey); };
      }
      const statusEl = qs('.profile-feed-status', item);
      const renderFeedStatus = () => {
        if (!statusEl) return;
        const statusText = getProfileStatusText(displayPubkey);
        statusEl.textContent = statusText;
        statusEl.style.display = statusText ? 'block' : 'none';
      };
      renderFeedStatus();
      const timeEl = qs('.profile-feed-time', item);
      if (timeEl) timeEl.textContent = `${formatTimeAgo(note.created_at)} ago`;

      // Fetch and display profile if not cached yet
      if (!state.profilesByPubkey.has(displayPubkey)) {
        fetchProfileIfNeeded(displayPubkey).then(() => {
          const fresh = profileFor(displayPubkey);
          if (nameEl) { nameEl.textContent = fresh.name || shortHex(displayPubkey); nameEl.style.cursor = 'pointer'; }
          if (avEl) {
            setAvatarEl(avEl, fresh.picture || '', pickAvatar(displayPubkey));
            avEl.classList.toggle('nip05-square', !!getVerifiedNip05ForPubkey(displayPubkey, fresh.nip05 || ''));
          }
          renderFeedStatus();
        }).catch(() => {});
      }

      const mediaUrls = extractMediaUrlsFromEvent(displayNote);
      const mediaItems = mediaUrls
        .map((url) => ({ url, kind: classifyMediaUrl(url) }))
        .filter((m) => m.kind && isLikelyUrl(m.url));
      const text = stripMediaUrlsFromText(displayNote.content || '', mediaUrls);
      const textEl = qs('.profile-feed-text', item);
      if (textEl) {
        textEl.innerHTML = '';
        if (text) {
          textEl.appendChild(renderNostrContent(text));
          textEl.style.display = 'block';
        } else {
          textEl.textContent = mediaItems.length ? '' : (isRepost ? '[Reposted content]' : '[empty note]');
          textEl.style.display = !mediaItems.length ? 'block' : 'none';
        }
      }

      const mediaWrap = qs('.profile-feed-media-wrap', item);
      if (mediaWrap) {
        if (mediaItems.length) renderPostMedia(mediaWrap, mediaItems);
        else mediaWrap.style.display = 'none';
      }

      const stats = (aggregates && aggregates.statsByPost.get(note.id)) || { likes: 0, emoji: 0, boosts: 0, zaps: 0 };
      const comments = (aggregates && aggregates.commentsByPost.get(note.id)) || [];
      const likeSet = (aggregates && aggregates.likePubkeysByPost && aggregates.likePubkeysByPost.get(note.id)) || new Set();
      const emojiMap = (aggregates && aggregates.emojiByPost && aggregates.emojiByPost.get(note.id)) || new Map();
      const commentsCount = qs('.pfs-comments strong', item);
      const likesCount = qs('.profile-post-like-btn strong', item);
      const zapsCount = qs('.pfs-zaps strong', item);
      const boostsCount = qs('.pfs-boosts strong', item);
      if (commentsCount) commentsCount.textContent = `${comments.length}`;
      if (likesCount) likesCount.textContent = `${stats.likes}`;
      if (zapsCount) zapsCount.textContent = `${stats.zaps}`;
      if (boostsCount) boostsCount.textContent = `${stats.boosts}`;

      const own = state.user ? normalizePubkeyHex(state.user.pubkey) : '';
      const likeBtn = qs('.profile-post-like-btn', item);
      if (likeBtn) {
        likeBtn.classList.toggle('active', !!(own && likeSet.has(own)));
        likeBtn.addEventListener('click', () => window.toggleProfilePostLike(note.id, note.pubkey, pubkey));
      }

      const emojiPlusBtn = qs('.profile-post-emoji-btn', item);
      if (emojiPlusBtn) {
        emojiPlusBtn.addEventListener('click', () => window.openReactionPickerForPost(note.id, note.pubkey, pubkey));
      }

      const emojiBar = qs('.profile-feed-emoji-bar', item);
      if (emojiBar) {
        emojiBar.innerHTML = '';
        const entries = Array.from(emojiMap.values())
          .filter((entry) => entry && entry.pubkeys && entry.pubkeys.size)
          .sort((a, b) => {
            if (b.pubkeys.size !== a.pubkeys.size) return b.pubkeys.size - a.pubkeys.size;
            return String(a.key || '').localeCompare(String(b.key || ''));
          });

        if (!entries.length) {
          emojiBar.style.display = 'none';
        } else {
          emojiBar.style.display = 'flex';
          entries.forEach((entry) => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'stream-emoji-chip' + (own && entry.pubkeys.has(own) ? ' active' : '');
            chip.title = `${entry.label || entry.key} (${entry.pubkeys.size})`;
            chip.addEventListener('click', () => {
              window.toggleProfilePostEmoji(note.id, note.pubkey, pubkey, entry.key, entry.imageUrl || '', entry.shortcode || '');
            });

            const countEl = document.createElement('span');
            countEl.className = 'stream-emoji-count';
            countEl.textContent = `${entry.pubkeys.size}`;
            chip.appendChild(countEl);

            if (entry.imageUrl) {
              const img = document.createElement('img');
              img.src = entry.imageUrl;
              img.alt = entry.label || entry.key;
              img.loading = 'lazy';
              chip.appendChild(img);
            } else {
              const txt = document.createElement('span');
              txt.textContent = String(entry.label || entry.key).slice(0, 18);
              chip.appendChild(txt);
            }
            emojiBar.appendChild(chip);
          });
        }
      }

      const commentsWrap = qs('.profile-feed-comments', item);
      const maxPreview = 3;
      let expandedComments = false;
      const renderComments = () => {
        if (!commentsWrap) return;
        commentsWrap.innerHTML = '';

        if (!comments.length) {
          commentsWrap.innerHTML = '<div class="profile-comment-empty">No comments yet.</div>';
          return;
        }

        const list = expandedComments ? comments : comments.slice(0, maxPreview);
        list.forEach((comment) => {
          const cp = profileFor(comment.pubkey);
          const row = document.createElement('div');
          row.className = 'profile-comment-item';
          row.innerHTML = `
            <div class="profile-comment-av"></div>
            <div class="profile-comment-main">
              <div class="profile-comment-meta"><span class="n"></span><span class="t"></span></div>
              <div class="profile-comment-text"></div>
            </div>`;
          const cAvEl = qs('.profile-comment-av', row);
          setAvatarEl(cAvEl, cp.picture || '', pickAvatar(comment.pubkey));
          const commentVerifiedNip05 = getVerifiedNip05ForPubkey(comment.pubkey, cp.nip05 || '');
          if (cAvEl && commentVerifiedNip05) cAvEl.classList.add('nip05-square');
          else if (normalizeNip05Value(cp.nip05 || '')) ensureNip05Verification(comment.pubkey, cp.nip05 || '').catch(() => {});
          if (cAvEl) { cAvEl.style.cursor = 'pointer'; cAvEl.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(comment.pubkey); }; }
          const n = qs('.profile-comment-meta .n', row);
          if (n) {
            n.textContent = cp.display_name || cp.name || shortHex(comment.pubkey);
            n.style.cursor = 'pointer';
            n.onclick = (e) => { e.stopPropagation(); showProfileByPubkey(comment.pubkey); };
          }
          const t = qs('.profile-comment-meta .t', row);
          if (t) t.textContent = `${formatTimeAgo(comment.created_at)} ago`;
          const ct = qs('.profile-comment-text', row);
          if (ct) {
            const commentText = (comment.content || '').trim();
            ct.innerHTML = '';
            if (commentText) { ct.appendChild(renderNostrContent(commentText)); }
            else { ct.textContent = '[empty comment]'; }
          }

          // If profile not cached yet, fetch and update row
          if (!state.profilesByPubkey.has(comment.pubkey)) {
            fetchProfileIfNeeded(comment.pubkey).then(() => {
              const fresh = profileFor(comment.pubkey);
              if (n) n.textContent = fresh.display_name || fresh.name || shortHex(comment.pubkey);
              if (cAvEl) {
                setAvatarEl(cAvEl, fresh.picture || '', pickAvatar(comment.pubkey));
                cAvEl.classList.toggle('nip05-square', !!getVerifiedNip05ForPubkey(comment.pubkey, fresh.nip05 || ''));
              }
            }).catch(() => {});
          }

          commentsWrap.appendChild(row);
        });

        if (comments.length > maxPreview) {
          const more = document.createElement('button');
          more.className = 'profile-comments-more';
          more.textContent = expandedComments
            ? 'Show fewer comments'
            : `Show ${comments.length - maxPreview} more comments`;
          more.addEventListener('click', () => {
            expandedComments = !expandedComments;
            renderComments();
          });
          commentsWrap.appendChild(more);
        }
      };
      renderComments();

      const commentInput = qs('.profile-comment-input', item);
      const commentBtn = qs('.profile-comment-btn', item);
      if (commentBtn && commentInput) {
        commentBtn.addEventListener('click', async () => {
          const content = (commentInput.value || '').trim();
          if (!content) return;
          if (!state.user) { window.openLogin(); return; }
          commentBtn.disabled = true;
          const original = commentBtn.textContent;
          commentBtn.textContent = 'Posting...';
          try {
            const tags = [['e', note.id], ['p', note.pubkey]];
            const signed = await signAndPublish(1, content, tags);
            const map = state.profileNotesByPubkey.get(pubkey) || new Map();
            map.set(signed.id, signed);
            state.profileNotesByPubkey.set(pubkey, map);
            commentInput.value = '';
            renderProfileFeed(pubkey);
          } catch (err) {
            if (window.console) console.warn('Could not post comment', err);
          } finally {
            commentBtn.disabled = false;
            commentBtn.textContent = original;
          }
        });
      }

      listEl.appendChild(item);
    });

    // Infinite scroll sentinel â€” appear if more posts exist beyond current limit
    if (notes.length > limit) {
      const sentinel = document.createElement('div');
      sentinel.className = 'feed-sentinel';
      sentinel.innerHTML = '<span class="feed-sentinel-label">Loading more postsâ€¦</span>';
      listEl.appendChild(sentinel);

      const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const newLimit = limit + 15;
        listEl.dataset.feedLimit = String(newLimit);
        // Re-render with higher limit using current data
        const map = state.profileNotesByPubkey.get(pubkey) || new Map();
        const freshNotes = Array.from(map.values())
          .filter((ev) => {
            if (!ev || ev.pubkey !== pubkey) return false;
            if (ev.kind === 6) return true;
            return isTopLevelProfilePost(ev, pubkey);
          })
          .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
        const freshAgg = buildProfilePostAggregates(pubkey, freshNotes);
        renderProfileFeedInto(listEl, freshNotes, profileFor(pubkey), pubkey, freshAgg);
      }, { rootMargin: '180px' });
      obs.observe(sentinel);
    }
  }
  function renderProfileFeed(pubkey) {
    const leftList = qs('#profileFeedList');
    const tabList = qs('#profileFeedListSide');
    const count = qs('#profileFeedCount');

    const map = state.profileNotesByPubkey.get(pubkey) || new Map();
    // Include top-level kind:1 posts AND kind:6 reposts authored by this pubkey (NIP-18)
    const notes = Array.from(map.values())
      .filter((ev) => {
        if (!ev || ev.pubkey !== pubkey) return false;
        if (ev.kind === 6) return true;
        return isTopLevelProfilePost(ev, pubkey);
      })
      .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));

    if (count) count.textContent = `${notes.length} notes`;

    const aggregates = buildProfilePostAggregates(pubkey, notes);
    const profile = profileFor(pubkey);
    renderProfileFeedInto(leftList, notes, profile, pubkey, aggregates);
    renderProfileFeedInto(tabList, notes, profile, pubkey, aggregates);
  }

  function extractHttpUrls(text) {
    const raw = (text || '').match(/https?:\/\/\S+/gi) || [];
    return raw.map((url) =>
      String(url || '')
        .replace(/[)\],.;!?'"`>]+$/g, '')
        .replace(/^[("'`<]+/g, '')
    );
  }

  function classifyMediaUrl(url) {
    const base = (url || '').split('#')[0].split('?')[0].toLowerCase();
    if (/\.(mp4|webm|mov|m4v|mkv|m3u8)$/.test(base)) return 'video';
    if (/\.(jpg|jpeg|png|gif|webp|avif)$/.test(base)) return 'photo';
    return '';
  }

  function extractMediaUrlsFromEvent(ev) {
    const urls = extractHttpUrls(ev && ev.content ? ev.content : '').map((u) => sanitizeMediaUrl(u)).filter(Boolean);
    const tags = (ev && Array.isArray(ev.tags)) ? ev.tags : [];
    tags.forEach((tag) => {
      if (!Array.isArray(tag) || tag.length < 2) return;
      const key = String(tag[0] || '').toLowerCase();
      const value = sanitizeMediaUrl(tag[1] || '');
      if (!/^https?:\/\//i.test(value)) return;
      if (key === 'url' || key === 'r' || key === 'image' || key === 'thumb' || key === 'streaming') {
        urls.push(value);
      }
    });
    return Array.from(new Set(urls));
  }

  function collectProfileMedia(pubkey) {
    const map = state.profileNotesByPubkey.get(pubkey) || new Map();
    const notes = Array.from(map.values())
      .filter((ev) => (ev.pubkey === pubkey) && (ev.kind === 1 || ev.kind === 20 || ev.kind === 21 || ev.kind === 22 || ev.kind === 1063))
      .sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    const videos = [];
    const photos = [];
    const seenVideo = new Set();
    const seenPhoto = new Set();

    notes.forEach((note) => {
      const urls = extractMediaUrlsFromEvent(note);
      const caption = (note.content || '').trim();
      urls.forEach((url) => {
        const kind = classifyMediaUrl(url);
        if (kind === 'video' && !seenVideo.has(url) && videos.length < 200) {
          videos.push({ url, note, caption });
          seenVideo.add(url);
        }
        if (kind === 'photo' && !seenPhoto.has(url) && photos.length < 500) {
          photos.push({ url, note, caption });
          seenPhoto.add(url);
        }
      });
    });

    return { videos, photos };
  }

  function renderProfilePastStreams(pubkey) {
    const list = qs('#profilePastStreamsList');
    if (!list) return;

    const items = Array.from(state.streamsByAddress.values())
      .filter((stream) => (stream.pubkey === pubkey || stream.hostPubkey === pubkey) && stream.status !== 'live')
      .sort((a, b) => (b.created_at || 0) - (a.created_at || 0))
      .slice(0, 24);

    if (!items.length) {
      list.innerHTML = '<div class="profile-feed-empty">No past streams found yet.</div>';
      return;
    }

    list.innerHTML = '';
    items.forEach((stream) => {
      const row = document.createElement('div');
      row.className = 'profile-stream-item';

      const left = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'profile-stream-title';
      title.textContent = stream.title || 'Untitled stream';
      const meta = document.createElement('div');
      meta.className = 'profile-stream-meta';
      meta.textContent = `${(stream.status || 'past').toUpperCase()} - ${formatTimeAgo(stream.created_at)} ago`;
      left.appendChild(title);
      left.appendChild(meta);

      const openBtn = document.createElement('button');
      openBtn.className = 'btn btn-ghost';
      openBtn.style.padding = '.28rem .58rem';
      openBtn.style.fontSize = '.72rem';
      openBtn.textContent = 'Open';
      openBtn.disabled = !stream.address;
      openBtn.addEventListener('click', () => {
        if (stream.address) openStream(stream.address);
      });

      row.appendChild(left);
      row.appendChild(openBtn);
      list.appendChild(row);
    });
  }

  function renderProfileVideos(media) {
    const wrap = qs('#profileVideosList');
    if (!wrap) return;

    if (!media.videos.length) {
      wrap.innerHTML = '<div class="profile-feed-empty">No short videos detected in recent notes.</div>';
      return;
    }

    const limit = parseInt(wrap.dataset.mediaLimit || '9', 10);

    wrap.innerHTML = '';
    media.videos.slice(0, limit).forEach((item) => {
      const card = document.createElement('div');
      card.className = 'profile-video-card';

      const frame = document.createElement('div');
      frame.className = 'profile-video-frame';
      if (/\.m3u8($|\?)/i.test(item.url)) {
        const fallback = document.createElement('div');
        fallback.className = 'profile-video-fallback';
        fallback.innerHTML = 'HLS video<br><a href="#" style="color:var(--zap)">Open</a>';
        const link = qs('a', fallback);
        if (link) {
          link.href = item.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
        }
        frame.appendChild(fallback);
      } else {
        const video = document.createElement('video');
        video.controls = true;
        video.autoplay = false;
        video.loop = false;
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.preload = 'metadata';
        // Use <source> for better cross-origin/MIME support
        const src = document.createElement('source');
        src.src = item.url;
        const ext = item.url.split('?')[0].toLowerCase().split('.').pop();
        const mimes = { mp4: 'video/mp4', webm: 'video/webm', mov: 'video/mp4', m4v: 'video/mp4' };
        if (mimes[ext]) src.type = mimes[ext];
        video.appendChild(src);
        // Fallback link on error
        video.addEventListener('error', () => {
          const fb = document.createElement('div');
          fb.className = 'profile-video-fallback';
      fb.innerHTML = `<a href="${item.url}" target="_blank" rel="noopener noreferrer" style="color:var(--zap)">▶ Open Video</a>`;
          frame.replaceChild(fb, video);
        });
        frame.appendChild(video);
      }

      const meta = document.createElement('div');
      meta.className = 'profile-video-meta';
      const caption = document.createElement('div');
      caption.className = 'profile-video-caption';
      caption.textContent = item.caption || item.url;
      const time = document.createElement('div');
      time.className = 'profile-video-time';
      time.textContent = `${formatTimeAgo(item.note.created_at)} ago`;
      meta.appendChild(caption);
      meta.appendChild(time);

      card.appendChild(frame);
      card.appendChild(meta);
      wrap.appendChild(card);
    });

    // Infinite scroll sentinel for videos
    if (media.videos.length > limit) {
      const sentinel = document.createElement('div');
      sentinel.className = 'feed-sentinel media-sentinel';
      sentinel.style.gridColumn = '1/-1';
      sentinel.innerHTML = '<span class="feed-sentinel-label">Loading more videosâ€¦</span>';
      wrap.appendChild(sentinel);

      const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        wrap.dataset.mediaLimit = String(limit + 9);
        renderProfileVideos(media);
      }, { rootMargin: '180px' });
      obs.observe(sentinel);
    }
  }

  function renderProfilePhotos(media) {
    const wrap = qs('#profilePhotosList');
    if (!wrap) return;

    if (!media.photos.length) {
      wrap.innerHTML = '<div class="profile-feed-empty">No photo posts detected in recent notes.</div>';
      return;
    }

    const limit = parseInt(wrap.dataset.mediaLimit || '18', 10);

    wrap.innerHTML = '';
    media.photos.slice(0, limit).forEach((item) => {
      const card = document.createElement('a');
      card.className = 'profile-photo-card';
      card.href = item.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.src = item.url;
      img.alt = 'Nostr photo';
      img.loading = 'lazy';
      card.appendChild(img);

      const cap = document.createElement('div');
      cap.className = 'profile-photo-cap';
      cap.textContent = item.caption || `${formatTimeAgo(item.note.created_at)} ago`;
      card.appendChild(cap);

      wrap.appendChild(card);
    });

    // Infinite scroll sentinel for photos
    if (media.photos.length > limit) {
      const sentinel = document.createElement('div');
      sentinel.className = 'feed-sentinel media-sentinel';
      sentinel.style.gridColumn = '1/-1';
      sentinel.innerHTML = '<span class="feed-sentinel-label">Loading more photosâ€¦</span>';
      wrap.appendChild(sentinel);

      const obs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        wrap.dataset.mediaLimit = String(limit + 18);
        renderProfilePhotos(media);
      }, { rootMargin: '180px' });
      obs.observe(sentinel);
    }
  }

  function renderProfileCollections(pubkey) {
    renderProfilePastStreams(pubkey);
    const media = collectProfileMedia(pubkey);
    renderProfileVideos(media);
    renderProfilePhotos(media);
  }

  function setProfileTab(tabName) {
    const tabMap = {
      posts: 'Posts',
      streams: 'Streams',
      media: 'Media'
    };
    const postsBtn = qs('#profileTabBtnPosts');
    const postsAllowed = !!(postsBtn && postsBtn.style.display !== 'none');
    let tab = tabName;
    if (tab === 'videos' || tab === 'photos') tab = 'media';
    if (!Object.prototype.hasOwnProperty.call(tabMap, tab)) tab = 'streams';
    if (tab === 'posts' && !postsAllowed) tab = 'streams';
    state.profileTab = tab;
    Object.keys(tabMap).forEach((key) => {
      const btn = qs(`#profileTabBtn${tabMap[key]}`);
      if (btn) btn.classList.toggle('active', key === tab);
      const pane = qs(`#profileTab${tabMap[key]}`);
      if (pane) pane.classList.toggle('on', key === tab);
    });
  }

  /* =====================================================================
     NOSTR BADGES (NIP-58)
     kind:8  = Badge Award (issued to a pubkey)
     kind:30009 = Badge Definition (created by issuer)
     ===================================================================== */

  // badgesByPubkey: Map<pubkey, Map<badgeId, { award, definition }>>
  if (!state.badgesByPubkey) state.badgesByPubkey = new Map();
  if (!state.badgeSubId) state.badgeSubId = null;
  if (!state.badgeDefMap) state.badgeDefMap = new Map(); // Map<"pubkey:d", definition event>

  function parseBadgeAddressRef(value) {
    const raw = String(value || '').trim();
    if (!raw) return null;
    const parts = raw.split(':');
    if (parts.length < 3) return null;
    const kind = parts.shift();
    const pubkey = parts.shift();
    const d = parts.join(':');
    if (kind !== '30009' || !pubkey || !d) return null;
    return { pubkey, d, key: `${pubkey}:${d}` };
  }

  function badgeInfoFromEvents(award, definition) {
    const image = sanitizeMediaUrl(getBadgeDefTag(definition, 'image') || getBadgeDefTag(definition, 'thumb'));
    const awardATag = ((award && award.tags) || []).find((t) => Array.isArray(t) && t[0] === 'a' && t[1]);
    const ref = parseBadgeAddressRef(awardATag ? awardATag[1] : '');
    const badgeId = (getBadgeDefTag(definition, 'd') || (ref && ref.d) || '').trim();
    const displayName = (getBadgeDefTag(definition, 'name') || badgeId || '').trim();
    const fallbackName = displayName || (ref ? `Award ${shortHex(ref.pubkey)}` : 'Unknown award');
    const desc = getBadgeDefTag(definition, 'description') || '';
    const issuer = (getBadgeDefTag(definition, 'issuer') || (definition && definition.pubkey) || (ref && ref.pubkey) || '').trim();

    return {
      image,
      name: fallbackName,
      desc,
      id: badgeId,
      issuer
    };
  }

  function subscribeBadges(pubkey) {
    if (!pubkey) return;
    if (state.badgeSubId) { state.pool.unsubscribe(state.badgeSubId); state.badgeSubId = null; }

    if (!state.badgesByPubkey.has(pubkey)) state.badgesByPubkey.set(pubkey, new Map());

    // Fetch kind:8 badge awards where this pubkey is tagged
    state.badgeSubId = state.pool.subscribe(
      [{ kinds: [8], '#p': [pubkey], limit: 100 }],
      {
        event: (ev) => {
          if (ev.kind !== 8) return;
          // Each award references a badge definition via 'a' tag: "30009:creatorPubkey:d-tag"
          const aTags = (ev.tags || []).filter((t) => t[0] === 'a' && t[1]);
          aTags.forEach((aTag) => {
            const ref = parseBadgeAddressRef(aTag[1]);
            if (!ref) return;
            const awardMap = state.badgesByPubkey.get(pubkey);
            const existing = awardMap.get(ref.key);
            if (!existing || Number(existing.award && existing.award.created_at || 0) <= Number(ev.created_at || 0)) {
              awardMap.set(ref.key, { award: ev, definition: state.badgeDefMap.get(ref.key) || (existing && existing.definition) || null });
            }
            // Fetch definition if not cached
            if (!state.badgeDefMap.has(ref.key)) {
              fetchBadgeDefinition(ref.pubkey, ref.d);
            }
          });
          renderProfileBadges(pubkey);
        },
        eose: () => { renderProfileBadges(pubkey); }
      }
    );
  }

  function fetchBadgeDefinition(creatorPubkey, d) {
    const defKey = `${creatorPubkey}:${d}`;
    if (state.badgeDefMap.has(defKey)) return;
    const subId = state.pool.subscribe(
      [{ kinds: [30009], authors: [creatorPubkey], '#d': [d], limit: 1 }],
      {
        event: (ev) => {
          if (ev.kind !== 30009) return;
          state.badgeDefMap.set(defKey, ev);
          // Update any awaiting badge entries
          state.badgesByPubkey.forEach((awardMap, pubkey) => {
            if (awardMap.has(defKey)) {
              awardMap.get(defKey).definition = ev;
              if (state.selectedProfilePubkey === pubkey) renderProfileBadges(pubkey);
            }
          });
          state.pool.unsubscribe(subId);
        },
        eose: () => { state.pool.unsubscribe(subId); }
      }
    );
  }

  function getBadgeDefTag(ev, tagName) {
    if (!ev || !Array.isArray(ev.tags)) return '';
    const t = ev.tags.find((t) => t[0] === tagName);
    return t ? (t[1] || '') : '';
  }

  function renderProfileBadges(pubkey) {
    const panel = qs('#profileBadgesPanel');
    const grid = qs('#profileBadgesGrid');
    const bioGrid = qs('#profileBioGrid');
    if (!panel || !grid || !bioGrid) return;

    const awardMap = state.badgesByPubkey.get(pubkey);
    const badges = awardMap ? Array.from(awardMap.values()) : [];

    if (!badges.length) {
      panel.style.display = 'none';
      bioGrid.classList.remove('has-badges');
      return;
    }

    panel.style.display = 'block';
    bioGrid.classList.add('has-badges');
    grid.innerHTML = '';

    const MAX_SHOWN = 9; // 3x3 grid

    function makeBadgeChip(award, definition) {
      const chip = document.createElement('div');
      chip.className = 'profile-badge-chip';
      const info = badgeInfoFromEvents(award, definition);
      if (info.image && isLikelyUrl(info.image)) {
        const img = document.createElement('img');
        img.src = info.image; img.alt = info.name; img.loading = 'lazy';
        img.onerror = () => { chip.innerHTML = ''; };
        chip.appendChild(img);
      } else { chip.textContent = ''; }
      chip.title = info.name;
      chip.addEventListener('click', () => { openBadgePopup({ ...info, definition, award }); });
      return chip;
    }

    badges.slice(0, MAX_SHOWN).forEach(({ award, definition }) => {
      grid.appendChild(makeBadgeChip(award, definition));
    });

    if (badges.length > MAX_SHOWN) {
      const more = document.createElement('div');
      more.className = 'badge-see-more';
      more.textContent = `+${badges.length - MAX_SHOWN}`;
      more.title = 'See all badges';
      more.addEventListener('click', () => openAllBadgesPopup(badges));
      grid.appendChild(more);
    }
  }

  function subscribeProfileStats(pubkey) {
    if (!pubkey) return;
    if (state.profileStatsSubId) state.pool.unsubscribe(state.profileStatsSubId);

    let followerSet = new Set();
    let followingSet = new Set();
    let latestFollowingCreated = 0;

    state.profileStatsByPubkey.set(pubkey, { followers: 0, following: 0 });

    state.profileStatsSubId = state.pool.subscribe(
      [
        { kinds: [3], authors: [pubkey], limit: 10 },
        { kinds: [3], '#p': [pubkey], limit: 400 }
      ],
      {
        event: (ev) => {
          if (ev.kind !== 3) return;

          if (ev.pubkey === pubkey) {
            const created = Number(ev.created_at || 0);
            if (created >= latestFollowingCreated) {
              latestFollowingCreated = created;
              followingSet = new Set();
              (ev.tags || []).forEach((tag) => {
                if (Array.isArray(tag) && tag[0] === 'p' && tag[1]) followingSet.add(tag[1]);
              });
            }
          } else {
            followerSet.add(ev.pubkey);
          }

          state.profileStatsByPubkey.set(pubkey, {
            followers: followerSet.size,
            following: followingSet.size
          });

          if (state.selectedProfilePubkey === pubkey) renderProfilePage(pubkey);
          // Refresh theater stat if this is the open stream's host
          const openStream = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
          if (openStream && openStream.pubkey === pubkey) {
            const el = qs('#theaterFollowers');
            if (el) el.textContent = formatCount(followerSet.size);
          }
        },
        eose: () => {
          state.profileStatsByPubkey.set(pubkey, {
            followers: followerSet.size,
            following: followingSet.size
          });
          if (state.selectedProfilePubkey === pubkey) renderProfilePage(pubkey);
          const openStream = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
          if (openStream && openStream.pubkey === pubkey) {
            const el = qs('#theaterFollowers');
            if (el) el.textContent = formatCount(followerSet.size);
          }
        }
      }
    );
  }

  function renderProfileFollowButton(pubkey) {
    const isOwn = !!(pubkey && state.user && state.user.pubkey === pubkey);
    const messageBtn = qs('#profileMessageBtn');
    const zapBtn = qs('#profileZapBtn');
    const editBtn = qs('#profileEditBtn');
    const btn = qs('#profileFollowBtn');

    if (messageBtn) messageBtn.style.display = isOwn ? 'none' : '';
    if (zapBtn) zapBtn.style.display = isOwn ? 'none' : '';
    if (btn) btn.style.display = isOwn ? 'none' : '';
    if (editBtn) editBtn.style.display = isOwn ? 'inline-flex' : 'none';
    if (!btn) return;

    btn.disabled = false;
    btn.classList.remove('following-active');

    if (!pubkey) {
      btn.textContent = 'Follow';
      return;
    }

    if (isOwn) return;

    const following = isFollowingPubkey(pubkey);
    btn.textContent = following ? 'Following' : 'Follow';
    btn.classList.toggle('following-active', following);
  }

  function updateOwnFollowingStat(delta) {
    if (!state.user) return;
    const ownPubkey = normalizePubkeyHex(state.user.pubkey);
    if (!ownPubkey) return;

    const current = state.profileStatsByPubkey.get(ownPubkey) || { followers: 0, following: 0 };
    const nextFollowing = Math.max(0, Number(current.following || 0) + Number(delta || 0));
    state.profileStatsByPubkey.set(ownPubkey, {
      followers: Number(current.followers || 0),
      following: nextFollowing
    });

    if (normalizePubkeyHex(state.selectedProfilePubkey) === ownPubkey) {
      const followingEl = qs('#profFollowing');
      if (followingEl) followingEl.textContent = formatCount(nextFollowing);
    }
  }

  function subscribeProfileFeed(pubkey) {
    if (!pubkey) return;
    if (state.profileFeedSubId) state.pool.unsubscribe(state.profileFeedSubId);

    const leftList = qs('#profileFeedList');
    const sideList = qs('#profileFeedListSide');
    if (leftList) { leftList.innerHTML = '<div class="profile-feed-empty">Loading notes from relays...</div>'; leftList.dataset.feedLimit = '15'; }
    if (sideList) { sideList.innerHTML = '<div class="profile-feed-empty">Loading notes from relays...</div>'; sideList.dataset.feedLimit = '15'; }

    // Reset media limits
    const videosEl = qs('#profileVideosList');
    const photosEl = qs('#profilePhotosList');
    if (videosEl) videosEl.dataset.mediaLimit = '9';
    if (photosEl) photosEl.dataset.mediaLimit = '18';

    const existing = state.profileNotesByPubkey.get(pubkey);
    if (!existing) state.profileNotesByPubkey.set(pubkey, new Map());

    state.profileFeedSubId = state.pool.subscribe(
      [
        { kinds: [1, 6, KIND_REACTION, KIND_DELETION, 20, 21, 22, 1063, KIND_ZAP_RECEIPT], authors: [pubkey], limit: 320, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 180 },
        { kinds: [1, 6, KIND_REACTION, KIND_DELETION, KIND_ZAP_RECEIPT], '#p': [pubkey], limit: 620, since: Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 180 }
      ],
      {
        event: (ev) => {
          const map = state.profileNotesByPubkey.get(pubkey) || new Map();
          const current = map.get(ev.id);
          if (!current || (current.created_at || 0) <= (ev.created_at || 0)) {
            map.set(ev.id, ev);
            state.profileNotesByPubkey.set(pubkey, map);
          }
          if (state.selectedProfilePubkey === pubkey) {
            renderProfileFeed(pubkey);
            renderProfileCollections(pubkey);
          }
        },
        eose: () => {
          if (state.selectedProfilePubkey === pubkey) {
            renderProfileFeed(pubkey);
            renderProfileCollections(pubkey);
          }
        }
      }
    );
  }

  function renderProfilePage(pubkey) {
    const p = profileFor(pubkey);

    const profName = qs('#profName');
    if (profName) profName.textContent = p.name;

    setAvatarEl(qs('#profAv'), p.picture || '', pickAvatar(pubkey));

    const nip05Main = qs('#profNip05');
    const nip05Check = qs('#profNip05Check');
    const npubEl = qs('#profNpub');
    const claimedNip05 = normalizeNip05Value(p.nip05 || '');
    const verifiedNip05 = getVerifiedNip05ForPubkey(pubkey, claimedNip05);
    if (claimedNip05 && !verifiedNip05) ensureNip05Verification(pubkey, claimedNip05).catch(() => {});

    if (npubEl) npubEl.textContent = formatNpubForDisplay(pubkey);

    if (verifiedNip05) {
      if (nip05Main) { nip05Main.style.display = 'flex'; nip05Main.textContent = `NIP-05: ${verifiedNip05}`; }
      if (nip05Check) {
        nip05Check.style.display = 'inline';
        nip05Check.textContent = '\u2713';
        nip05Check.title = 'NIP-05 verified';
      }
    } else {
      if (nip05Main) nip05Main.style.display = 'none';
      if (nip05Check) nip05Check.style.display = 'none';
    }
    if (npubEl) npubEl.style.display = 'block';
    setProfileVerificationStyle(verifiedNip05 ? 'verified' : 'none');
    renderProfileKind30315(pubkey);

    const bio = qs('#profBio');
    const bioText = (p.about || 'No bio yet.').trim() || 'No bio yet.';
    if (bio) bio.textContent = bioText;

    const bioToggle = qs('#profBioToggle');
    const isExpanded = !!state.profileBioExpandedByPubkey.get(pubkey);
    if (bio) bio.classList.toggle('clamped', !isExpanded);
    const hasLongBio = bioText.length > 280 || (bioText.match(/\n/g) || []).length >= 5;
    if (bioToggle) {
      bioToggle.style.display = hasLongBio ? 'inline-flex' : 'none';
      bioToggle.textContent = isExpanded ? 'Show less' : 'Show more';
    }

    const websiteRow = qs('#profWebsiteRow');
    const websiteBio = qs('#profWebsiteBio');
    let website = (p.website || '').trim();
    if (website && !isLikelyUrl(website) && /^[a-z0-9.-]+\.[a-z]{2,}/i.test(website)) {
      website = `https://${website}`;
    }
    if (website && isLikelyUrl(website)) {
      if (websiteBio) {
        websiteBio.href = website;
        websiteBio.textContent = website;
      }
      if (websiteRow) websiteRow.style.display = 'inline-flex';
    } else if (websiteRow) {
      websiteRow.style.display = 'none';
    }

    const lud16Row = qs('#profLud16Row');
    const lud16Bio = qs('#profLud16Bio');
    const lud16 = (p.lud16 || '').trim();
    if (lud16) {
      if (lud16Bio) lud16Bio.textContent = lud16;
      if (lud16Row) lud16Row.style.display = 'inline-flex';
    } else if (lud16Row) {
      lud16Row.style.display = 'none';
    }

    const twitterRow = qs('#profTwitterRow');
    const twitterBio = qs('#profTwitterBio');
    const tw = normalizeTwitterLink(p.twitter || '');
    if (tw.url) {
      if (twitterBio) {
        twitterBio.href = tw.url;
        twitterBio.textContent = tw.label || tw.url;
      }
      if (twitterRow) twitterRow.style.display = 'inline-flex';
    } else if (twitterRow) {
      twitterRow.style.display = 'none';
    }

    const githubRow = qs('#profGithubRow');
    const githubBio = qs('#profGithubBio');
    const gh = normalizeGithubLink(p.github || '');
    if (gh.url) {
      if (githubBio) {
        githubBio.href = gh.url;
        githubBio.textContent = gh.label || gh.url;
      }
      if (githubRow) githubRow.style.display = 'inline-flex';
    } else if (githubRow) {
      githubRow.style.display = 'none';
    }

    const bannerImg = qs('#profBannerImg');
    if (bannerImg && p.banner && isLikelyUrl(p.banner)) {
      bannerImg.src = p.banner;
      bannerImg.style.display = 'block';
    } else if (bannerImg) {
      bannerImg.removeAttribute('src');
      bannerImg.style.display = 'none';
    }

    const userStreams = Array.from(state.streamsByAddress.values()).filter((s) => s.pubkey === pubkey || s.hostPubkey === pubkey);
    const sinceEl = qs('#profNostrSince');
    const firstSeenTs = estimateProfileFirstSeen(pubkey, p);
    if (sinceEl) sinceEl.textContent = ''; // hidden via CSS; kept for Time on Nostr stat tile

    const followers = qs('#profFollowers');
    const following = qs('#profFollowing');
    const streams = qs('#profStreams');
    const sats = qs('#profSats');
    const postCountEl = qs('#profPostCount');
    const nostrAgeStatEl = qs('#profNostrAgeStat');
    const stats = state.profileStatsByPubkey.get(pubkey) || { followers: 0, following: 0 };

    if (followers) followers.textContent = formatCount(stats.followers || 0);
    if (following) following.textContent = formatCount(stats.following || 0);
    const noteMap = state.profileNotesByPubkey.get(pubkey) || new Map();
    const noteCount = Array.from(noteMap.values()).filter((ev) => ev.pubkey === pubkey && ev.kind === 1).length;
    if (postCountEl) postCountEl.textContent = formatCount(noteCount);
    if (streams) streams.textContent = `${userStreams.length}`;
    if (nostrAgeStatEl) nostrAgeStatEl.textContent = firstSeenTs ? formatNostrAge(firstSeenTs) : '-';
    if (sats) sats.textContent = formatCount(userStreams.length * 2100);

    // Show compose box only on own profile
    const composeBox = qs('#profileComposeBox');
    const composeAv = qs('#profileComposeAv');
    const isOwnProfile = !!(state.user && state.user.pubkey === pubkey);
    if (composeBox) composeBox.classList.toggle('hidden', !isOwnProfile);
    if (isOwnProfile && composeAv) {
      setAvatarEl(composeAv, p.picture || '', pickAvatar(pubkey));
    }

    const liveWrap = qs('#profileLiveWrap');
    const liveStatus = qs('#profLiveStatus');
    const live = getLatestLiveByPubkey(pubkey);
    state.selectedProfileLiveAddress = live ? live.address : null;

    if (live) {
      if (liveWrap) liveWrap.style.display = 'block';
      if (liveStatus) liveStatus.textContent = 'LIVE';
      renderProfileLivePlayback(live);
    } else {
      if (liveWrap) liveWrap.style.display = 'none';
      if (liveStatus) liveStatus.textContent = 'offline';
      clearProfilePlayback();
    }

    const postsLeft = qs('#profilePostsLeft');
    const postsTabBtn = qs('#profileTabBtnPosts');
    if (live) {
      if (postsLeft) postsLeft.style.display = 'none';
      if (postsTabBtn) postsTabBtn.style.display = 'inline-flex';
    } else {
      if (postsLeft) postsLeft.style.display = 'block';
      if (postsTabBtn) postsTabBtn.style.display = 'none';
      if (state.profileTab === 'posts') state.profileTab = 'streams';
    }

    renderProfileFeed(pubkey);
    renderProfileCollections(pubkey);
    renderProfileFollowButton(pubkey);
    renderProfileBadges(pubkey);
    setProfileTab(state.profileTab || 'streams');
  }

  function openStreamFromProfile() {
    if (!state.selectedProfileLiveAddress) return;
    openStream(state.selectedProfileLiveAddress);
  }

  function showProfileByPubkey(pubkey, opts = {}) {
    const routeMode = opts.routeMode || 'push';
    if (!pubkey) return;
    state.selectedProfilePubkey = pubkey;
    const p = profileFor(pubkey);
    const verifiedNip05 = getVerifiedNip05ForPubkey(pubkey, p.nip05 || '');
    if (!verifiedNip05 && normalizeNip05Value(p.nip05 || '')) ensureNip05Verification(pubkey, p.nip05 || '').catch(() => {});
    window.showProfile(p.name, pickAvatar(pubkey), formatNpubForDisplay(pubkey), verifiedNip05, pubkey, { routeMode });
    renderProfilePage(pubkey);
    subscribeProfileFeed(pubkey);
    subscribeProfileStats(pubkey);
    subscribeProfileStatus(pubkey);
    subscribeBadges(pubkey);
  }

  async function toggleFollowSelectedProfile() {
    const pubkey = normalizePubkeyHex(state.selectedProfilePubkey);
    if (!pubkey) return;
    if (!state.user) { window.openLogin(); return; }
    if (normalizePubkeyHex(state.user.pubkey) === pubkey) return;
    if (state.followPublishPending) return;
    state.followPublishPending = true;

    try {
      const wasFollowing = isFollowingPubkey(pubkey);
      const next = !wasFollowing;
      const current = state.profileStatsByPubkey.get(pubkey) || { followers: 0, following: 0 };
      const prevFollowers = Number(current.followers || 0);
      const nextFollowers = Math.max(0, prevFollowers + (next ? 1 : -1));

      state.profileStatsByPubkey.set(pubkey, {
        followers: nextFollowers,
        following: Number(current.following || 0)
      });

      setFollowingPubkey(pubkey, next);
      state.contactListPubkeys = new Set(state.followedPubkeys);
      updateOwnFollowingStat(next ? 1 : -1);
      renderProfileFollowButton(pubkey);
      updateTheaterFollowBtn(pubkey);
      renderLiveGrid();
      const followers = qs('#profFollowers');
      if (followers) followers.textContent = formatCount(nextFollowers);

      try {
        await publishFollowedPubkeysToNostr();
        state.contactListPubkeys = new Set(state.followedPubkeys);
        renderFollowingCount();
        renderLiveGrid();
      } catch (err) {
        setFollowingPubkey(pubkey, wasFollowing);
        state.contactListPubkeys = new Set(state.followedPubkeys);
        updateOwnFollowingStat(next ? -1 : 1);
        state.profileStatsByPubkey.set(pubkey, {
          followers: prevFollowers,
          following: Number(current.following || 0)
        });
        renderProfileFollowButton(pubkey);
        updateTheaterFollowBtn(pubkey);
        renderLiveGrid();
        if (followers) followers.textContent = formatCount(prevFollowers);
        alert(err.message || 'Failed to update follow list.');
      }
    } finally {
      state.followPublishPending = false;
    }
  }

  function setAuthenticatedUser(pubkey, authMode) {
    state.authMode = authMode;
    state.followPublishPending = false;
    state.streamLikePublishPending = false;
    state.goLiveSelectedAddress = '';
    state.goLiveHiddenEndedAddresses = loadHiddenEndedStreamsForPubkey(pubkey);
    state.boostedStreamAddresses = new Set();
    state.streamBoostEventIdByAddress = new Map();
    state.streamBoostCheckedByAddress = new Set();
    state.streamBoostCheckPendingByAddress = new Set();
    state.streamReactionPublishPendingByKey = new Set();
    state.postReactionPublishPendingByNoteAndKey = new Set();
    state.user = { pubkey, profile: state.profilesByPubkey.get(pubkey) || null };
    ensureNip05Verification(pubkey, state.user.profile && state.user.profile.nip05 || '').catch(() => {});
    setUserUi();
    renderStreamReactionsUi();
    const selected = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
    if (selected) {
      updateTheaterShareBtn(selected);
      refreshOwnStreamBoostState(selected);
    }
    window.closeLogin();
    subscribeProfiles([pubkey]);
  }

  async function loginWithExtension() {
    if (!window.nostr || typeof window.nostr.getPublicKey !== 'function') {
      throw new Error('No NIP-07 signer found. You can still use nsec login.');
    }
    const pubkey = await window.nostr.getPublicKey();
    state.localSecretKey = null;
    localStorage.removeItem(LOCAL_NSEC_STORAGE_KEY);
    setAuthenticatedUser(pubkey, 'nip07');
  }

  async function loginWithNsec(nsecOrHex, persist = true) {
    const tools = await ensureNostrTools();
    if (!tools || typeof tools.getPublicKey !== 'function') {
      throw new Error('Could not load local key tools.');
    }

    const input = (nsecOrHex || '').trim();
    if (!input) {
      throw new Error('Enter your nsec key first.');
    }

    let secret;
    if (/^[0-9a-f]{64}$/i.test(input)) {
      secret = hexToBytes(input);
    } else {
      if (!tools.nip19 || typeof tools.nip19.decode !== 'function') {
        throw new Error('Could not load NIP-19 key decoder.');
      }

      let decoded;
      try {
        decoded = tools.nip19.decode(input);
      } catch (_) {
        throw new Error('Invalid nsec key.');
      }

      if (!decoded || decoded.type !== 'nsec') {
        throw new Error('Invalid nsec key.');
      }
      secret = normalizeSecretKey(decoded.data);
    }

    const pubkey = tools.getPublicKey(secret);
    state.localSecretKey = secret;
    if (persist) localStorage.setItem(LOCAL_NSEC_STORAGE_KEY, input);
    setAuthenticatedUser(pubkey, 'local');
  }

  async function publishUserProfile(profileData) {
    if (!state.user) return;

    const payload = {
      name: profileData.name || shortHex(state.user.pubkey),
      display_name: profileData.display_name || profileData.name || shortHex(state.user.pubkey),
      about: profileData.about || '',
      picture: profileData.picture || '',
      banner: profileData.banner || '',
      website: profileData.website || '',
      lud16: profileData.lud16 || '',
      nip05: profileData.nip05 || ''
    };

    await signAndPublish(KIND_PROFILE, JSON.stringify(payload), []);

    const merged = {
      ...profileFor(state.user.pubkey),
      pubkey: state.user.pubkey,
      name: payload.name,
      display_name: payload.display_name,
      about: payload.about,
      picture: payload.picture,
      banner: payload.banner,
      website: payload.website,
      lud16: payload.lud16,
      nip05: payload.nip05
    };

    state.profilesByPubkey.set(state.user.pubkey, merged);
    state.user.profile = merged;
    setUserUi();

    if (state.selectedProfilePubkey === state.user.pubkey) {
      renderProfilePage(state.user.pubkey);
      syncProfileRoute(state.user.pubkey, 'replace');
    }
  }

  function openOnboarding(prefill = {}) {
    const modal = qs('#onboardingModal');
    if (!modal) return;

    // Populate nsec
    const nsecEl = qs('#onbNsecValue');
    if (nsecEl) {
      nsecEl.textContent = state.pendingOnboardingNsec || 'nsec1...';
      nsecEl.classList.remove('revealed');
    }

    // Reset reveal/copy buttons
    const revealBtn = qs('#onbRevealBtn');
    if (revealBtn) revealBtn.textContent = '👁 Reveal';
    const copyBtn = qs('#onbCopyBtn');
    if (copyBtn) { copyBtn.textContent = '📋 Copy'; copyBtn.classList.remove('copied'); }

    // Reset checkbox + continue button
    const check = qs('#onbSavedCheck');
    if (check) check.checked = false;
    const cont = qs('#onbContinueBtn');
    if (cont) cont.classList.remove('ready');

    // Pre-fill profile fields
    const set = (id, val) => { const el = qs(id); if (el) el.value = val || ''; };
    set('#onbDisplayName', prefill.name);
    set('#onbAvatar', prefill.picture);
    set('#onbBanner', prefill.banner || state.settings.banner);
    set('#onbBio', prefill.about);
    set('#onbWebsite', prefill.website || state.settings.website);
    set('#onbLud16', prefill.lud16 || state.settings.lud16);
    set('#onbNip05', prefill.nip05);

    // Reset to step 1
    onbSetStep(1);

    // Update avatar preview
    onbUpdatePreview();

    modal.classList.add('open');
    // Also close login modal if open
    const loginModal = qs('#loginModal');
    if (loginModal) loginModal.classList.remove('open');
  }

  function onbSetStep(n) {
    const s1 = qs('#onbStep1'), s2 = qs('#onbStep2');
    const d1 = qs('#onbDot1'), d2 = qs('#onbDot2');
    const line = qs('#onbStepLine');
    if (n === 1) {
      if (s1) s1.classList.add('active');
      if (s2) s2.classList.remove('active');
      if (d1) { d1.classList.add('active'); d1.classList.remove('done'); }
      if (d2) { d2.classList.remove('active', 'done'); }
      if (line) line.classList.remove('done');
    } else {
      if (s1) s1.classList.remove('active');
      if (s2) s2.classList.add('active');
      if (d1) { d1.classList.remove('active'); d1.classList.add('done'); }
      if (d2) { d2.classList.add('active'); d2.classList.remove('done'); }
      if (line) line.classList.add('done');
    }
  }

  function closeOnboarding() {
    const modal = qs('#onboardingModal');
    if (modal) modal.classList.remove('open');
  }

  // Called from HTML: reveal the blurred nsec
  function onbRevealNsec() {
    const el = qs('#onbNsecValue');
    const btn = qs('#onbRevealBtn');
    if (!el) return;
    const revealed = el.classList.toggle('revealed');
    if (btn) btn.textContent = revealed ? '🙈 Hide' : '👁 Reveal';
  }

  // Called from HTML: copy nsec to clipboard
  async function onbCopyNsec() {
    const value = state.pendingOnboardingNsec || (qs('#onbNsecValue') && qs('#onbNsecValue').textContent) || '';
    if (!value || value === 'nsec1...') return;
    try {
      await navigator.clipboard.writeText(value);
      const btn = qs('#onbCopyBtn');
      if (btn) {
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2000);
      }
      // Also reveal so user can verify what was copied
      const el = qs('#onbNsecValue');
      if (el) { el.classList.add('revealed'); }
      const revBtn = qs('#onbRevealBtn');
      if (revBtn) revBtn.textContent = '🙈 Hide';
    } catch (_) {
      alert('Clipboard blocked. Please manually select and copy the key.');
    }
  }

  // Kept for backward compatibility (old HTML may call this)
  async function copyOnboardingNsec() { return onbCopyNsec(); }

  // Called when checkbox changes
  function onbCheckSaved() {
    const check = qs('#onbSavedCheck');
    const btn = qs('#onbContinueBtn');
    if (!btn) return;
    if (check && check.checked) {
      btn.classList.add('ready');
    } else {
      btn.classList.remove('ready');
    }
  }

  // Advance to profile step
  function onbGoToProfile() {
    const check = qs('#onbSavedCheck');
    if (!check || !check.checked) return;
    onbSetStep(2);
    onbUpdatePreview();
  }

  // Go back to key step
  function onbBackToKey() {
    onbSetStep(1);
  }

  // Live avatar preview update
  function onbUpdatePreview() {
    const circle = qs('#onbAvatarPreview');
    if (!circle) return;
    const url = (qs('#onbAvatar') && qs('#onbAvatar').value.trim()) || '';
    const name = (qs('#onbDisplayName') && qs('#onbDisplayName').value.trim()) || '';
    if (url) {
      circle.innerHTML = `<img src="${url}" alt="" onerror="this.parentElement.innerHTML='${name ? name[0].toUpperCase() : '?'}'">`;
    } else {
      circle.innerHTML = name ? name[0].toUpperCase() : '?';
    }
    if (url) circle.style.borderColor = 'var(--green)';
    else circle.style.borderColor = '';
  }

  async function completeOnboarding() {
    const saveBtn = qs('#onbSaveBtn');
    if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Savingâ€¦'; }

    const profileData = {
      name: (qs('#onbDisplayName') && qs('#onbDisplayName').value.trim()) || shortHex(state.user ? state.user.pubkey : ''),
      picture: (qs('#onbAvatar') && qs('#onbAvatar').value.trim()) || '',
      banner: (qs('#onbBanner') && qs('#onbBanner').value.trim()) || '',
      about: (qs('#onbBio') && qs('#onbBio').value.trim()) || '',
      website: (qs('#onbWebsite') && qs('#onbWebsite').value.trim()) || '',
      lud16: (qs('#onbLud16') && qs('#onbLud16').value.trim()) || '',
      nip05: (qs('#onbNip05') && qs('#onbNip05').value.trim()) || ''
    };

    try {
      await publishUserProfile(profileData);
      const nextSettings = {
        ...state.settings,
        website: profileData.website || state.settings.website,
        banner: profileData.banner || state.settings.banner,
        lud16: profileData.lud16 || state.settings.lud16
      };
      applySettings(nextSettings, { reconnect: false });
      closeOnboarding();
    } catch (err) {
      if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = '✓ Save & Enter Sifaka Live'; }
      alert(err.message || 'Failed to publish profile. Please try again.');
    }
  }

  function skipOnboarding() {
    closeOnboarding();
  }

  async function createLocalIdentity() {
    const saved = (localStorage.getItem(LOCAL_NSEC_STORAGE_KEY) || '').trim();
    if (saved) {
      try {
        await loginWithNsec(saved, false);
        state.pendingOnboardingNsec = saved;
        const current = state.user ? profileFor(state.user.pubkey) : null;
        if (state.user) {
          openOnboarding({
            name: (current && current.name) || '',
            picture: (current && current.picture) || pickAvatar(state.user.pubkey),
            banner: (current && current.banner) || state.settings.banner || '',
            about: (current && current.about) || '',
            website: (current && current.website) || state.settings.website || '',
            lud16: (current && current.lud16) || state.settings.lud16 || ''
          });
          return;
        }
      } catch (err) {
        const msg = (err && err.message ? err.message : '').toLowerCase();
        if (msg.includes('invalid')) {
          localStorage.removeItem(LOCAL_NSEC_STORAGE_KEY);
        } else {
          throw err;
        }
      }
    }

    const tools = await ensureNostrTools();
    const secret = typeof tools.generateSecretKey === 'function'
      ? tools.generateSecretKey()
      : crypto.getRandomValues(new Uint8Array(32));

    const nsec = tools.nip19 && typeof tools.nip19.nsecEncode === 'function'
      ? tools.nip19.nsecEncode(secret)
      : bytesToHex(secret);

    const pubkey = tools.getPublicKey(secret);
    state.localSecretKey = normalizeSecretKey(secret);
    state.pendingOnboardingNsec = nsec;
    localStorage.setItem(LOCAL_NSEC_STORAGE_KEY, nsec);
    setAuthenticatedUser(pubkey, 'local');

    openOnboarding({
      name: '',
      picture: pickAvatar(pubkey),
      banner: state.settings.banner || '',
      website: state.settings.website || '',
      lud16: state.settings.lud16 || ''
    });
  }

  async function tryRestoreLocalLogin() {
    const saved = (localStorage.getItem(LOCAL_NSEC_STORAGE_KEY) || '').trim();
    if (!saved) return false;

    try {
      await loginWithNsec(saved, false);
      return true;
    } catch (err) {
      const msg = (err && err.message ? err.message : '').toLowerCase();
      const permanent = msg.includes('invalid') || msg.includes('unsupported') || msg.includes('missing');
      if (permanent) localStorage.removeItem(LOCAL_NSEC_STORAGE_KEY);
      return false;
    }
  }

  async function publishCurrentStream(statusOverride) {
    if (!state.user) {
      window.openLogin();
      throw new Error('Please login first. Signer is optional: you can use nsec mode.');
    }

    const dTagInput = qs('#goLiveDTag');
    const titleInput = qs('#goLiveTitle');
    const summaryInput = qs('#goLiveSummary');
    const streamUrlInput = qs('#goLiveStreamUrl');
    const thumbInput = qs('#goLiveThumb');
    const startsInput = qs('#goLiveStarts');
    const statusEl = qs('.srow .sc.sl');

    const preferredAddress = statusOverride
      ? state.selectedStreamAddress
      : (state.goLiveSelectedAddress || state.selectedStreamAddress);
    const currentEditAddress = (preferredAddress || '').trim();
    const current = currentEditAddress ? state.streamsByAddress.get(currentEditAddress) : null;
    const useCurrentFields = !!(statusOverride && current);

    const dTagVal = dTagInput ? dTagInput.value.trim() : '';
    const titleVal = titleInput ? titleInput.value.trim() : '';
    const summaryVal = summaryInput ? summaryInput.value.trim() : '';
    const streamUrlVal = streamUrlInput ? streamUrlInput.value.trim() : '';
    const thumbVal = thumbInput ? thumbInput.value.trim() : '';
    const startsRaw = startsInput ? startsInput.value : '';
    const startsParsed = toUnixSeconds(startsRaw);

    const dTag = useCurrentFields
      ? ((current && current.d) || `stream-${Date.now()}`)
      : (dTagVal || (current ? current.d : '') || `stream-${Date.now()}`);
    const title = useCurrentFields
      ? ((current && current.title) || 'Untitled stream')
      : (titleVal || (current ? current.title : '') || 'Untitled stream');
    const summary = useCurrentFields
      ? ((current && current.summary) || '')
      : (summaryInput ? summaryVal : ((current && current.summary) || ''));
    const streamUrl = useCurrentFields
      ? ((current && current.streaming) || '')
      : (streamUrlInput ? streamUrlVal : ((current && current.streaming) || ''));
    const thumb = useCurrentFields
      ? ((current && current.image) || '')
      : (thumbInput ? thumbVal : ((current && current.image) || ''));
    const starts = useCurrentFields
      ? ((current && current.starts) || null)
      : (startsInput ? (startsRaw ? startsParsed : null) : ((current && current.starts) || null));
    const rawStatus = statusOverride || (statusEl ? statusEl.textContent : ((current && current.status) || 'live'));
    const status = normalizeStreamStatus(rawStatus);

    const tags = [
      ['d', dTag],
      ['title', title],
      ['summary', summary],
      ['status', status],
      ['alt', `Live stream: ${title}`]
    ];

    if (streamUrl) tags.push(['streaming', streamUrl]);
    if (thumb) tags.push(['image', thumb]);
    if (starts) tags.push(['starts', `${starts}`]);
    state.relays.forEach((r) => tags.push(['relay', r]));

    const ev = await signAndPublish(KIND_LIVE_EVENT, summary, tags);
    const stream = parseLiveEvent(ev);
    upsertStream(stream);
    state.selectedStreamAddress = stream.address;
    if (status === 'ended') {
      state.goLiveHiddenEndedAddresses.add(stream.address);
      if (state.goLiveSelectedAddress === stream.address) state.goLiveSelectedAddress = '';
    } else {
      state.goLiveHiddenEndedAddresses.delete(stream.address);
      state.goLiveSelectedAddress = stream.address;
    }
    persistHiddenEndedStreamsForCurrentUser();
    state.isLive = status === 'live';
    updateGoLiveModalState();
    updateGoLiveButtonState();
    renderLiveGrid();
    // Refresh hero if this is the currently featured stream
    const featStreams = heroFeaturedStreams();
    if (featStreams.length) renderHero(featStreams[state.featuredIndex], state.featuredIndex, featStreams.length);
    renderVideo(stream);
    subscribeChat(stream);
    return stream;
  }

  async function sendChatMessage() {
    const input = qs('.chat-inp');
    const text = (input && input.value.trim()) || '';
    if (!text) return;
    if (!state.user) {
      window.openLogin();
      return;
    }
    const stream = state.streamsByAddress.get(state.selectedStreamAddress);
    if (!stream) return;

    const tags = [
      ['a', stream.address],
      ['e', stream.id],
      ['p', stream.pubkey]
    ];

    try {
      await signAndPublish(KIND_LIVE_CHAT, text, tags);
      input.value = '';
    } catch (err) {
      alert(err.message || 'Failed to send chat message.');
    }
  }

  async function sendReaction() {
    const stream = state.streamsByAddress.get(state.selectedStreamAddress);
    if (!stream) return;
    if (!state.user) { window.openLogin(); return; }
    if (state.streamLikePublishPending) return;
    state.streamLikePublishPending = true;
    const ownPubkey = normalizePubkeyHex(state.user.pubkey);
    if (!ownPubkey) { state.streamLikePublishPending = false; return; }
    const alreadyLiked = state.likedStreamAddresses.has(stream.address);
    const likeMeta = { key: '+', label: '❤', imageUrl: '', shortcode: '' };

    try {
      if (alreadyLiked) {
        removeOwnStreamReactionByKey('+');
        renderStreamReactionsUi(stream);

        let reactionId = state.streamLikeEventIdByAddress.get(stream.address) || '';
        if (!reactionId) {
          reactionId = await findOwnStreamLikeReactionId(stream);
          if (reactionId) state.streamLikeEventIdByAddress.set(stream.address, reactionId);
        }

        if (reactionId) {
          await signAndPublish(KIND_DELETION, 'unliked stream', [['e', reactionId], ['k', String(KIND_REACTION)], ['a', stream.address]]);
          removeStreamReactionById(reactionId);
          state.streamLikeEventIdByAddress.delete(stream.address);
        } else {
          // Fallback for relays that cannot return our prior reaction quickly.
          await signAndPublish(KIND_REACTION, '-', [['e', stream.id], ['p', stream.pubkey], ['a', stream.address]]);
        }
      } else {
        applyStreamReaction(likeMeta, ownPubkey, '');
        renderStreamReactionsUi(stream);
        const likeEv = await signAndPublish(KIND_REACTION, '+', [['e', stream.id], ['p', stream.pubkey], ['a', stream.address]]);
        if (likeEv && likeEv.id) {
          state.streamLikeEventIdByAddress.set(stream.address, likeEv.id);
          applyStreamReaction(likeMeta, ownPubkey, likeEv.id);
        }
      }
      renderStreamReactionsUi(stream);
    } catch (err) {
      if (alreadyLiked) {
        applyStreamReaction(likeMeta, ownPubkey, state.streamLikeEventIdByAddress.get(stream.address) || '');
      } else {
        removeOwnStreamReactionByKey('+');
      }
      renderStreamReactionsUi(stream);
      alert(err.message || 'Failed to react.');
    } finally {
      state.streamLikePublishPending = false;
    }
  }

  function wireEvents() {
    const searchInput = qs('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderSearch((e.target.value || '').trim().toLowerCase());
      });
      searchInput.addEventListener('focus', (e) => {
        if ((e.target.value || '').trim()) renderSearch((e.target.value || '').trim().toLowerCase());
      });
    }

    const sendBtn = qs('.chat-send-btn');
    if (sendBtn) sendBtn.addEventListener('click', sendChatMessage);
    const chatInput = qs('.chat-inp');
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendChatMessage();
        }
      });
    }

    qsa('.srow .sc').forEach((c) => {
      c.addEventListener('click', () => {
        const row = c.closest('.srow');
        qsa('.sc', row).forEach((x) => x.classList.remove('sl'));
        c.classList.add('sl');
      });
    });
  }

  function bindLegacyGlobals() {
    window.toggleDD = function (key) {
      const other = key === 'logo' ? 'profile' : 'logo';
      window.closeDD(other);
      const btnId = key === 'logo' ? 'logoBtn' : 'navUserPill';
      const ddId = key === 'logo' ? 'logoDropdown' : 'profileDropdown';
      const dd = qs(`#${ddId}`);
      const btn = qs(`#${btnId}`);
      const open = dd.classList.contains('open');
      dd.classList.toggle('open', !open);
      btn.classList.toggle('dd-open', !open);
    };

    window.closeDD = function (key) {
      const btnId = key === 'logo' ? 'logoBtn' : 'navUserPill';
      const ddId = key === 'logo' ? 'logoDropdown' : 'profileDropdown';
      const dd = qs(`#${ddId}`);
      const btn = qs(`#${btnId}`);
      if (dd) dd.classList.remove('open');
      if (btn) btn.classList.remove('dd-open');
    };

    window.closeAllDD = function () {
      window.closeDD('logo');
      window.closeDD('profile');
    };

    // Communities integration context:
    // exposes dynamic getters so the Communities module can reuse current app auth/relay state.
    window.__SIFAKA_CONTEXT = {
      getUser: () => (state.user ? { ...state.user } : null),
      getRelays: () => [...state.relays],
      getSettings: () => ({ ...state.settings }),
      openLogin: () => window.openLogin(),
      showProfileByPubkey: (pubkey) => showProfileByPubkey(pubkey)
    };

    window.showCommunities = function () {
      window.showPage('communities');
    };

    /* ---- Master audio/playback stop ----
       Call with which player to KEEP playing ('hero' | 'theater' | 'profile' | null).
       All other active players are paused and their HLS instances destroyed.       */
    function stopAllAudio(keep) {
      // --- Hero ---
      if (keep !== 'hero') {
        // Pause any <video> inside the hero player
        const heroPlayer = qs('#heroPlayer');
        if (heroPlayer) {
          heroPlayer.querySelectorAll('video').forEach((v) => {
            try { v.pause(); v.src = ''; } catch (_) {}
          });
        }
        // Destroy HLS instance
        if (state.heroHlsInstance) {
          try { state.heroHlsInstance.destroy(); } catch (_) {}
          state.heroHlsInstance = null;
        }
        state.heroPlaybackToken++;
      }

      // --- Theater (video page) ---
      if (keep !== 'theater') {
        const playerBg = qs('.player-bg');
        if (playerBg) {
          playerBg.querySelectorAll('video').forEach((v) => {
            try { v.pause(); v.src = ''; } catch (_) {}
          });
        }
        if (state.hlsInstance) {
          try { state.hlsInstance.destroy(); } catch (_) {}
          state.hlsInstance = null;
        }
        state.playbackToken++;
        // Stop runtime ticker
        clearInterval(state._theaterRuntimeInterval);
        state._theaterRuntimeInterval = null;
      }

      // --- Profile mini-player ---
      if (keep !== 'profile') {
        const profilePlayer = qs('#profileLivePlayer');
        if (profilePlayer) {
          profilePlayer.querySelectorAll('video').forEach((v) => {
            try { v.pause(); v.src = ''; } catch (_) {}
          });
        }
        if (state.profileHlsInstance) {
          try { state.profileHlsInstance.destroy(); } catch (_) {}
          state.profileHlsInstance = null;
        }
        state.profilePlaybackToken++;
      }
    }

    window.showPage = function (p, opts = {}) {
      const routeMode = opts.routeMode || 'push';
      const home = qs('#homePage');
      const video = qs('#videoPage');
      const profile = qs('#profilePage');
      const communities = qs('#communitiesPage');
      if (p !== 'video') setActiveViewerAddress('');
      if (p === 'home' && routeMode !== 'skip') syncHomeRoute(routeMode);
      if (home) home.classList.toggle('active', p === 'home');
      if (video) video.style.display = 'none';
      if (profile) profile.style.display = 'none';
      if (communities) communities.style.display = p === 'communities' ? 'block' : 'none';
      // Communities/home router behavior:
      // - home keeps hero playback and cycling
      // - all other top-level pages fully stop hero playback
      if (p === 'home') {
        stopAllAudio('hero');
        stopHeroCycle(); // clear any stale timer first
        const streams = heroFeaturedStreams();
        if (streams.length) startHeroCycle();
      } else {
        stopHeroCycle();
        stopAllAudio(null);
      }
      if (p === 'communities' && window.SifakaCommunities && typeof window.SifakaCommunities.mount === 'function') {
        // Communities view is mounted lazily so existing Sifaka Live startup stays fast.
        window.SifakaCommunities.mount();
      }
      if (state.settings.miniPlayer && state.selectedStreamAddress) window.showMini();
      else window.hideMini();
      window.scrollTo(0, 0);
    };

    window.showVideoPage = function (opts = {}) {
      const routeMode = opts.routeMode || 'replace';
      const home = qs('#homePage');
      const video = qs('#videoPage');
      const profile = qs('#profilePage');
      const communities = qs('#communitiesPage');
      const selected = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
      setActiveViewerAddress(selected ? selected.address : '');
      if (selected && routeMode !== 'skip') syncTheaterRoute(selected, routeMode);
      if (home) home.classList.remove('active');
      if (video) video.style.display = 'block';
      if (profile) profile.style.display = 'none';
      if (communities) communities.style.display = 'none';
      // Kill the hero cycle timer completely â€” prevents it firing and starting audio behind theater
      stopHeroCycle();
      stopAllAudio('theater');
      if (window.renderRecoStreams) window.renderRecoStreams(); // populate "Also Live Now"
      if (state.settings.miniPlayer && state.selectedStreamAddress) window.showMini();
      else window.hideMini();
      window.scrollTo(0, 0);
    };

    window.showProfile = function (name, av, npub, nip05, rawPubkey, opts = {}) {
      const routeMode = opts.routeMode || 'push';
      const home = qs('#homePage');
      const video = qs('#videoPage');
      const profile = qs('#profilePage');
      const communities = qs('#communitiesPage');
      setActiveViewerAddress('');
      if (home) home.classList.remove('active');
      if (video) video.style.display = 'none';
      if (profile) profile.style.display = 'block';
      if (communities) communities.style.display = 'none';
      // Kill the hero cycle timer completely â€” prevents audio starting behind profile
      stopHeroCycle();
      stopAllAudio('profile');

      setAvatarEl(qs('#profAv'), '', av || 'U');
      if (qs('#profName')) qs('#profName').textContent = name || 'user';
      if (qs('#profNpub')) qs('#profNpub').textContent = formatNpubForDisplay(npub || rawPubkey || '');
      const normalizedRawPubkey = normalizePubkeyHex(rawPubkey || '') || parseNpubMaybe(npub || '');
      const claimedNip05 = normalizeNip05Value(nip05 || '');
      const verifiedNip05 = normalizedRawPubkey ? getVerifiedNip05ForPubkey(normalizedRawPubkey, claimedNip05) : '';
      if (claimedNip05 && normalizedRawPubkey && !verifiedNip05) ensureNip05Verification(normalizedRawPubkey, claimedNip05).catch(() => {});
      setProfileVerificationStyle(verifiedNip05 ? 'verified' : 'none');

      const n05 = qs('#profNip05');
      const n05c = qs('#profNip05Check');
      if (verifiedNip05) {
        if (n05) {
          n05.style.display = 'flex';
          n05.textContent = `NIP-05: ${verifiedNip05}`;
        }
        if (n05c) {
          n05c.style.display = 'inline';
          n05c.textContent = '\u2713';
          n05c.title = 'NIP-05 verified';
        }
      } else {
        if (n05) n05.style.display = 'none';
        if (n05c) n05c.style.display = 'none';
      }
      if (qs('#profNpub')) qs('#profNpub').style.display = 'block';

      if (qs('#profBio') && !qs('#profBio').textContent.trim()) {
        qs('#profBio').textContent = 'No bio yet.';
      }

      let inferredPubkey = normalizedRawPubkey;
      if (!inferredPubkey) {
        const wantedName = (name || '').trim().toLowerCase();
        const wantedNip05 = claimedNip05;
        const fallback = Array.from(state.profilesByPubkey.values()).find((entry) => {
          const entryName = (entry.name || '').trim().toLowerCase();
          const entryNip05 = (entry.nip05 || '').trim().toLowerCase();
          if (wantedNip05 && entryNip05 === wantedNip05) return true;
          if (wantedName && entryName === wantedName) return true;
          return false;
        });
        inferredPubkey = fallback ? fallback.pubkey : '';
      }

      if (inferredPubkey) {
        if (routeMode !== 'skip') syncProfileRoute(inferredPubkey, routeMode);
        state.selectedProfilePubkey = inferredPubkey;
        renderProfilePage(inferredPubkey);
        subscribeProfileFeed(inferredPubkey);
        subscribeProfileStats(inferredPubkey);
        subscribeProfileStatus(inferredPubkey);
      } else {
        if (routeMode !== 'skip') syncHomeRoute(routeMode);
        state.selectedProfilePubkey = null;
        state.selectedProfileLiveAddress = null;
        subscribeProfileStatus('');
        renderProfileKind30315('');
        const liveWrap = qs('#profileLiveWrap');
        if (liveWrap) liveWrap.style.display = 'none';
        const feed = qs('#profileFeedList');
        if (feed) feed.innerHTML = '<div class="profile-feed-empty">This profile is in preview mode. Open a relay-backed user to load notes.</div>';
        const feedSide = qs('#profileFeedListSide');
        if (feedSide) feedSide.innerHTML = '<div class="profile-feed-empty">This profile is in preview mode. Open a relay-backed user to load notes.</div>';
        const past = qs('#profilePastStreamsList');
        if (past) past.innerHTML = '<div class="profile-feed-empty">Stream history needs a relay-backed profile.</div>';
        const videos = qs('#profileVideosList');
        if (videos) videos.innerHTML = '<div class="profile-feed-empty">Videos need a relay-backed profile.</div>';
        const photos = qs('#profilePhotosList');
        if (photos) photos.innerHTML = '<div class="profile-feed-empty">Photos need a relay-backed profile.</div>';

        const postsLeft = qs('#profilePostsLeft');
        const postsBtn = qs('#profileTabBtnPosts');
        if (postsLeft) postsLeft.style.display = 'block';
        if (postsBtn) postsBtn.style.display = 'none';
        if (state.profileTab === 'posts') state.profileTab = 'streams';
        renderProfileFollowButton('');
        setProfileVerificationStyle(verifiedNip05 ? 'verified' : 'none');

        const websiteRow = qs('#profWebsiteRow');
        const lud16Row = qs('#profLud16Row');
        const twitterRow = qs('#profTwitterRow');
        const githubRow = qs('#profGithubRow');
        if (websiteRow) websiteRow.style.display = 'none';
        if (lud16Row) lud16Row.style.display = 'none';
        if (twitterRow) twitterRow.style.display = 'none';
        if (githubRow) githubRow.style.display = 'none';
        const bioToggle = qs('#profBioToggle');
        if (bioToggle) bioToggle.style.display = 'none';
        const nostrSince = qs('#profNostrSince');
        if (nostrSince) nostrSince.textContent = '';

        setProfileTab(state.profileTab || 'streams');
      }

      window.scrollTo(0, 0);
    };

    window.goBackFromProfile = function () {
      window.showPage('home');
    };

    window.heroNav = function (delta) {
      heroAdvance(delta);
      resetHeroCycle();
    };

    window.heroWatchCurrent = function () {
      const streams = heroFeaturedStreams();
      if (!streams.length) return;
      const idx = ((state.featuredIndex % streams.length) + streams.length) % streams.length;
      openStream(streams[idx].address);
    };

    /* ---- NIP-51 / Following Live filter globals ---- */
    window.toggleListFilterDD = function (e) {
      toggleListFilterDDInternal(e);
    };

    window.setListFilter = function (filterId, clickedBtn) {
      setListFilterInternal(filterId, clickedBtn);
    };

    window.lfAddInputChange = function (el) {
      lfAddInputChangeInternal(el);
    };

    window.lfAddList = function () {
      lfAddListInternal();
    };

    // Close list filter dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#listFilterWrap')) closeListFilterDD();
    });

    window.openMyProfile = function () {
      if (!state.user) {
        window.openLogin();
        return;
      }
      showProfileByPubkey(state.user.pubkey);
    };

    window.switchProfileTab = function (tab) {
      setProfileTab(tab);
    };

    window.toggleProfileBio = function () {
      const pubkey = state.selectedProfilePubkey;
      if (!pubkey) return;
      const current = !!state.profileBioExpandedByPubkey.get(pubkey);
      state.profileBioExpandedByPubkey.set(pubkey, !current);
      renderProfilePage(pubkey);
    };

    window.toggleFollowProfile = function () {
      toggleFollowSelectedProfile();
    };

    window.openProfileMessage = function () {
      const btn = qs('#profileMessageBtn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Soon';
        setTimeout(() => { btn.textContent = original; }, 1200);
      }
    };

    window.openProfileEditSettings = function () {
      window.openSettings();
      window.switchSettingsTab('profile');
    };

    window.saveProfileKind30315Status = async function () {
      const selected = normalizePubkeyHex(state.selectedProfilePubkey);
      if (!selected) return;
      if (!state.user) { window.openLogin(); return; }
      const own = normalizePubkeyHex(state.user.pubkey);
      if (!own || own !== selected) return;
      if (state.profileStatusSavePending) return;

      const input = qs('#profKind30315Input');
      const btn = qs('#profKind30315SaveBtn');
      const nextStatus = String((input && input.value) || '').trim().slice(0, 180);

      state.profileStatusSavePending = true;
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Saving...';
      }

      try {
        const ev = await signAndPublish(KIND_PROFILE_STATUS, nextStatus, [['d', 'general']]);
        state.profileStatusByPubkey.set(selected, {
          text: nextStatus,
          created_at: Number(ev.created_at || Math.floor(Date.now() / 1000)),
          id: ev.id || ''
        });
        renderProfileKind30315(selected);
        renderProfileFeed(selected);
        if (btn) {
          btn.textContent = 'Saved';
          setTimeout(() => {
            const active = normalizePubkeyHex(state.selectedProfilePubkey);
            if (active === selected && btn) btn.textContent = 'Save';
          }, 1200);
        }
      } catch (err) {
        alert(err && err.message ? err.message : 'Failed to save status.');
        if (btn) btn.textContent = 'Save';
      } finally {
        state.profileStatusSavePending = false;
        renderProfileKind30315(selected);
      }
    };

    // ---- Add-to-List dropdown (NIP-51) ----
    function renderAtlDropdown() {
      const itemsEl = qs('#atlListItems');
      if (!itemsEl) return;
      itemsEl.innerHTML = '';

      const lists = Array.from(state.nip51Lists.values());
      if (!lists.length) {
        itemsEl.innerHTML = '<div class="atl-empty">No lists yet - create one below.</div>';
        return;
      }

      const pubkey = state.selectedProfilePubkey;
      lists.forEach((list) => {
        const btn = document.createElement('button');
        btn.className = 'atl-item';
        const inList = !!(pubkey && list.pubkeys.includes(pubkey));
        if (inList) {
          btn.textContent = '✓ ' + (list.name || 'Unnamed List');
          btn.classList.add('atl-saved');
          btn.title = 'Click to remove from this list';
        } else {
          btn.textContent = (list.name || 'Unnamed List');
          btn.title = 'Click to add to this list';
        }
        btn.addEventListener('click', async () => {
          if (!pubkey) return;
          if (!state.user) { window.openLogin(); return; }
          try {
            const tags = [];
            if (inList) {
              // Remove: republish list without this pubkey
              list.pubkeys.filter((pk) => pk !== pubkey).forEach((pk) => tags.push(['p', pk]));
            } else {
              // Add: republish list with this pubkey appended
              list.pubkeys.forEach((pk) => tags.push(['p', pk]));
              tags.push(['p', pubkey]);
            }
            tags.push(['d', list.d]);
            if (list.name) tags.push(['name', list.name]);
            await signAndPublish(30000, '', tags);
            // Optimistically update local state
            if (inList) {
              list.pubkeys = list.pubkeys.filter((pk) => pk !== pubkey);
            } else {
              list.pubkeys.push(pubkey);
            }
            renderAtlDropdown();
            renderListFilterDD();
          } catch (err) {
            alert(err.message || 'Failed to update list.');
          }
        });
        itemsEl.appendChild(btn);
      });
    }

    window.toggleAtlDropdown = function (e) {
      if (e) e.stopPropagation();
      const dd = qs('#atlDropdown');
      if (!dd) return;
      if (dd.classList.contains('open')) {
        dd.classList.remove('open');
      } else {
        renderAtlDropdown();
        dd.classList.add('open');
        // Hide create row when reopening
        const nr = qs('#atlNewRow');
        if (nr) nr.style.display = 'none';
      }
    };

    window.atlShowCreateRow = function () {
      const nr = qs('#atlNewRow');
      if (nr) { nr.style.display = 'flex'; qs('#atlNewInput') && qs('#atlNewInput').focus(); }
    };

    window.atlCreateList = async function () {
      const inp = qs('#atlNewInput');
      const name = inp ? inp.value.trim() : '';
      if (!name) return;
      if (!state.user) { window.openLogin(); return; }

      const d = `list-${Date.now()}`;
      const pubkey = state.selectedProfilePubkey;
      const tags = [['d', d], ['name', name]];
      if (pubkey) tags.push(['p', pubkey]);

      try {
        const signed = await signAndPublish(30000, '', tags);
        const list = { id: `30000:${state.user.pubkey}:${d}`, name, pubkeys: pubkey ? [pubkey] : [], kind: 30000, d, pubkey: state.user.pubkey };
        state.nip51Lists.set(list.id, list);
        if (inp) inp.value = '';
        const nr = qs('#atlNewRow');
        if (nr) nr.style.display = 'none';
        renderAtlDropdown();
        renderListFilterDD();
      } catch (err) {
        alert(err.message || 'Failed to create list.');
      }
    };

    // Close ATL dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const wrap = qs('#atlWrap');
      const dd = qs('#atlDropdown');
      if (dd && dd.classList.contains('open') && wrap && !wrap.contains(e.target)) {
        dd.classList.remove('open');
      }
    });

    window.addProfileToList = window.toggleAtlDropdown;

    window.shareProfile = async function () {
      const pubkey = state.selectedProfilePubkey;
      if (!pubkey) return;

      syncProfileRoute(pubkey, 'replace');
      const npub = formatNpubForDisplay(pubkey);
      const fallbackUrl = npub.startsWith('npub1') ? `${window.location.origin}/${npub}` : window.location.href;
      const text = isHomePath(window.location.pathname) ? fallbackUrl : window.location.href;
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text);
        }
      } catch (_) {
        // ignore clipboard failures
      }

      const btn = qs('#profileShareBtn');
      if (btn) {
        btn.textContent = 'Copied';
        setTimeout(() => { btn.textContent = 'Share'; }, 1200);
      }
    };

    window.showMini = function () {
      const m = qs('#miniPlayer');
      if (m) m.classList.add('visible');
    };

    window.hideMini = function () {
      const m = qs('#miniPlayer');
      if (m) m.classList.remove('visible');
    };

    window.closeMini = window.hideMini;
    window.returnToStream = function () { window.showVideoPage({ routeMode: 'push' }); };

    window.openGoLive = function () {
      if (!state.user) {
        window.openLogin();
        return;
      }
      if (!state.goLiveSelectedAddress && state.selectedStreamAddress) {
        state.goLiveSelectedAddress = state.selectedStreamAddress;
      }
      updateGoLiveModalState();
      const modal = qs('#goLiveModal');
      const form = qs('#mForm');
      const success = qs('#mSuccess');
      if (modal) modal.classList.add('open');
      if (form) form.style.display = 'block';
      if (success) success.className = 'msuccess';
    };

    window.closeGoLive = function () { qs('#goLiveModal').classList.remove('open'); };

    window.selectGoLiveStream = function (address) {
      state.goLiveSelectedAddress = (address || '').trim();
      updateGoLiveModalState();
    };

    window.removeGoLiveStreamFromList = function () {
      const address = (state.goLiveSelectedAddress || '').trim();
      if (!address) return;
      const stream = state.streamsByAddress.get(address);
      if (stream && normalizeStreamStatus(stream.status) !== 'ended') {
        alert('Only ended streams can be removed from this list.');
        return;
      }
      state.goLiveHiddenEndedAddresses.add(address);
      if (state.goLiveSelectedAddress === address) state.goLiveSelectedAddress = '';
      persistHiddenEndedStreamsForCurrentUser();
      updateGoLiveModalState();
    };

    window.publishStream = async function () {
      try {
        const stream = await publishCurrentStream();
        const status = normalizeStreamStatus(stream.status);
        const form = qs('#mForm');
        const success = qs('#mSuccess');
        const succTitle = success ? qs('.succ-title', success) : null;
        const succText = success ? qs('.succ-text', success) : null;
        if (form) form.style.display = 'none';
        if (success) success.classList.add('on');
        if (succTitle) succTitle.textContent = status === 'ended'
          ? 'Stream Ended'
          : (status === 'planned' ? 'Stream Updated' : "You're Live on Nostr!");
        if (succText) succText.textContent = status === 'ended'
          ? 'Your ended status has been published and removed from the edit list.'
          : (status === 'planned'
            ? 'Your stream details were updated with planned status.'
            : 'Your NIP-53 event is live on your relays.');
      } catch (err) {
        alert(err.message || 'Failed to publish stream.');
      }
    };

    window.goToMyStream = function () {
      const address = state.goLiveSelectedAddress || state.selectedStreamAddress;
      if (address) openStream(address);
      window.closeGoLive();
    };

    window.openEnd = function () { qs('#endModal').classList.add('open'); };
    window.closeEnd = function () { qs('#endModal').classList.remove('open'); };

    window.confirmEndStream = async function () {
      try {
        await publishCurrentStream('ended');
      } catch (err) {
        alert(err.message || 'Failed to publish end event.');
      }
      window.closeEnd();
      state.isLive = false;
      const selected = state.selectedStreamAddress && state.streamsByAddress.get(state.selectedStreamAddress);
      if (selected && normalizeStreamStatus(selected.status) === 'ended') {
        renderVideo(selected);
        window.showVideoPage({ routeMode: 'replace' });
      } else {
        window.showPage('home');
      }
    };

    window.openLogin = function () { qs('#loginModal').classList.add('open'); };
    window.closeLogin = function () { qs('#loginModal').classList.remove('open'); };

    window.loginDemo = async function (name) {
      try {
        if (name === 'keyuser') {
          const nsecInput = qs('.key-inp');
          const nsec = (nsecInput && nsecInput.value.trim()) || '';
          if (!nsec) throw new Error('Enter your nsec key first.');
          await loginWithNsec(nsec, true);
          if (nsecInput) nsecInput.value = '';
          return;
        }

        if (name === 'newnostr') {
          await createLocalIdentity();
          return;
        }

        await loginWithExtension();
      } catch (err) {
        alert(err.message || 'Login failed.');
      }
    };

    window.openSettings = function () {
      populateSettingsModal();
      qs('#settingsModal').classList.add('open');
      // Reset to profile tab each time
      window.switchSettingsTab('profile');
    };

    window.closeSettings = function () {
      qs('#settingsModal').classList.remove('open');
    };

    window.switchSettingsTab = function (tab) {
      ['profile','relays','app'].forEach(t => {
        const btn = qs(`#smTab-${t}`);
        const panel = qs(`#smPanel${t.charAt(0).toUpperCase()+t.slice(1)}`);
        if (btn) btn.classList.toggle('active', t === tab);
        if (panel) panel.classList.toggle('active', t === tab);
      });
    };

    window.previewSettingsAvatar = function (url) {
      const preview = qs('#smAvatarPreview');
      if (!preview) return;
      if (url && url.trim()) {
        preview.innerHTML = `<img src="${url.trim()}" alt="avatar" onerror="this.parentElement.innerHTML='?'">`;
      } else {
        preview.innerHTML = '?';
      }
    };

    window.toggleSetting = function (el) {
      if (el) el.classList.toggle('on');
    };

    window.addRelayFromSettings = function () {
      try {
        const input = qs('#settingsRelayInput');
        const value = (input && input.value.trim()) || '';
        if (!value) return;
        addRelayToSettings(value);
        if (input) input.value = '';
      } catch (err) {
        alert(err.message || 'Invalid relay URL.');
      }
    };

    // Save just the Nostr profile (NIP-01 kind:0)
    window.saveProfileSettings = async function () {
      try {
        if (!state.user) { alert('Please sign in first.'); return; }
        const displayName = (qs('#settingsDisplayName') || {}).value || '';
        const username = (qs('#settingsUsername') || {}).value || '';
        const about = (qs('#settingsAbout') || {}).value || '';
        const picture = (qs('#settingsAvatarUrl') || {}).value || '';
        const banner = (qs('#settingsBannerInput') || {}).value || '';
        const website = (qs('#settingsWebsiteInput') || {}).value || '';
        const lud16 = (qs('#settingsLud16Input') || {}).value || '';
        const nip05 = (qs('#settingsNip05Input') || {}).value || '';

        await publishUserProfile({ name: username || displayName, display_name: displayName, about, picture, banner, website, lud16, nip05 });

        state.settings.lud16 = lud16;
        state.settings.website = website;
        state.settings.banner = banner;
        persistSettings();
        window.closeSettings();
      } catch (err) {
        alert(err.message || 'Failed to save profile.');
      }
    };

    // Save relay settings only
    window.saveRelaySettings = function () {
      try {
        const next = { ...state.settings, relays: [...state.settings.relays] };
        applySettings(next, { reconnect: true });
        window.closeSettings();
      } catch (err) {
        alert(err.message || 'Failed to save relays.');
      }
    };

    // Save app/interface settings only
    window.saveAppSettings = function () {
      try {
        const next = collectSettingsFromModal();
        applySettings(next, { reconnect: false });
        window.closeSettings();
      } catch (err) {
        alert(err.message || 'Failed to save settings.');
      }
    };

    // Legacy save â€” kept for external references
    window.saveSettings = async function () {
      try {
        const next = collectSettingsFromModal();
        const relaysChanged = next.relays.join('|') !== state.settings.relays.join('|');
        applySettings(next, { reconnect: relaysChanged });

        if (state.user) {
          const current = profileFor(state.user.pubkey);
          const shouldUpdateProfile = (next.lud16 !== (current.lud16 || '')) || (next.website !== (current.website || '')) || (next.banner !== (current.banner || ''));
          if (shouldUpdateProfile) {
            await publishUserProfile({
              name: current.name,
              picture: current.picture,
              about: current.about,
              website: next.website,
              banner: next.banner,
              lud16: next.lud16
            });
          }
        }

        window.closeSettings();
      } catch (err) {
        alert(err.message || 'Failed to save settings.');
      }
    };

    window.copyOnboardingNsec = copyOnboardingNsec;
    window.completeOnboarding = completeOnboarding;
    window.skipOnboarding = skipOnboarding;
    window.closeOnboarding = closeOnboarding;
    window.onbRevealNsec = onbRevealNsec;
    window.onbCopyNsec = onbCopyNsec;
    window.onbCheckSaved = onbCheckSaved;
    window.onbGoToProfile = onbGoToProfile;
    window.onbBackToKey = onbBackToKey;
    window.onbUpdatePreview = onbUpdatePreview;
    window.openStreamFromProfile = openStreamFromProfile;

    window.openFaq = function () { qs('#faqModal').classList.add('open'); };
    window.closeFaq = function () { qs('#faqModal').classList.remove('open'); };
    window.toggleFaq = function (el) { el.closest('.faq-item').classList.toggle('open'); };
    window.switchTab = function (t) {
      const isChat = t === 'chat';
      qsa('.stab').forEach((s, i) => s.classList.toggle('active', isChat ? i === 0 : i === 1));
      if (qs('#chatScroll')) qs('#chatScroll').style.display = isChat ? 'flex' : 'none';
      if (qs('#viewersPanel')) qs('#viewersPanel').classList.toggle('on', !isChat);
    };

    window.toggleEmoji = function (ev) {
      ev.stopPropagation();
      qs('#emojiPicker').classList.toggle('open');
    };

    window.closeEmoji = function () {
      qs('#emojiPicker').classList.remove('open');
    };

    window.handleSearch = function (inp) {
      renderSearch((inp.value || '').trim().toLowerCase());
    };

    window.toggleLike = function () {
      sendReaction();
    };

    window.toggleStreamEmojiReaction = async function (reactionKey) {
      const knownMeta = state.streamReactionMetaByKey.get(reactionKey) || {};
      const reactionMeta = {
        key: normalizeReactionContentKey(reactionKey),
        label: knownMeta.label || reactionKey,
        imageUrl: knownMeta.imageUrl || '',
        shortcode: knownMeta.shortcode || ''
      };
      await toggleStreamReactionByMeta(reactionMeta);
    };

    window.toggleProfilePostLike = async function (noteId, notePubkey, profilePubkey) {
      await togglePostReactionByMeta(noteId, notePubkey, profilePubkey, { key: '+', label: '❤', imageUrl: '', shortcode: '' });
    };

    window.toggleProfilePostEmoji = async function (noteId, notePubkey, profilePubkey, reactionKey, imageUrl = '', shortcode = '') {
      const knownMeta = state.streamReactionMetaByKey.get(reactionKey) || {};
      const reactionMeta = {
        key: normalizeReactionContentKey(reactionKey),
        label: knownMeta.label || reactionKey,
        imageUrl: imageUrl || knownMeta.imageUrl || '',
        shortcode: shortcode || knownMeta.shortcode || ''
      };
      await togglePostReactionByMeta(noteId, notePubkey, profilePubkey, reactionMeta);
    };

    const renderReactionPickerGrid = () => {
      const grid = qs('#reactionPickerGrid');
      if (!grid) return;
      grid.innerHTML = '';
      defaultReactionPickerOptions().forEach((opt) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'reaction-opt-btn';
        btn.title = opt.label || opt.key;
        btn.addEventListener('click', async () => {
          const target = state.reactionPickerTarget;
          if (!target) return;
          if (target.type === 'stream') {
            await toggleStreamReactionByMeta(opt);
          } else if (target.type === 'post') {
            await togglePostReactionByMeta(target.noteId, target.notePubkey, target.profilePubkey, opt);
          }
          window.closeReactionPicker();
        });

        if (opt.imageUrl) {
          const img = document.createElement('img');
          img.src = opt.imageUrl;
          img.alt = opt.label || opt.key;
          img.loading = 'lazy';
          btn.appendChild(img);
        } else {
          btn.textContent = opt.label || opt.key;
        }
        grid.appendChild(btn);
      });
    };

    window.openReactionPickerForStream = function () {
      const stream = state.streamsByAddress.get(state.selectedStreamAddress);
      if (!stream) return;
      state.reactionPickerTarget = { type: 'stream' };
      renderReactionPickerGrid();
      const code = qs('#reactionPickerCode');
      const url = qs('#reactionPickerUrl');
      if (code) code.value = '';
      if (url) url.value = '';
      const ov = qs('#reactionPickerModal');
      if (ov) ov.classList.add('open');
      if (code) code.focus();
    };

    window.openReactionPickerForPost = function (noteId, notePubkey, profilePubkey) {
      if (!noteId || !notePubkey || !profilePubkey) return;
      state.reactionPickerTarget = { type: 'post', noteId, notePubkey, profilePubkey };
      renderReactionPickerGrid();
      const code = qs('#reactionPickerCode');
      const url = qs('#reactionPickerUrl');
      if (code) code.value = '';
      if (url) url.value = '';
      const ov = qs('#reactionPickerModal');
      if (ov) ov.classList.add('open');
      if (code) code.focus();
    };

    window.closeReactionPicker = function (e) {
      const ov = qs('#reactionPickerModal');
      if (!ov) return;
      if (e && e.target !== ov) return;
      ov.classList.remove('open');
      state.reactionPickerTarget = null;
      const code = qs('#reactionPickerCode');
      const url = qs('#reactionPickerUrl');
      if (code) code.value = '';
      if (url) url.value = '';
    };

    window.submitCustomReactionPicker = async function () {
      const target = state.reactionPickerTarget;
      if (!target) return;
      const code = (qs('#reactionPickerCode') && qs('#reactionPickerCode').value || '').trim();
      const url = (qs('#reactionPickerUrl') && qs('#reactionPickerUrl').value || '').trim();
      const reactionMeta = reactionMetaFromPicker(code, url);
      if (!reactionMeta) {
        alert('Enter an emoji or :shortcode: first.');
        return;
      }
      if (target.type === 'stream') {
        await toggleStreamReactionByMeta(reactionMeta);
      } else if (target.type === 'post') {
        await togglePostReactionByMeta(target.noteId, target.notePubkey, target.profilePubkey, reactionMeta);
      }
      window.closeReactionPicker();
    };

    window.toggleChatLikeMessage = async function (messageId) {
      const messageEvent = state.chatMessageEventsById.get(messageId);
      const stream = state.streamsByAddress.get(state.selectedStreamAddress);
      if (!messageEvent || !stream || !/^[0-9a-f]{64}$/i.test(messageId || '')) return;
      if (!state.user) { window.openLogin(); return; }
      if (state.chatLikePublishPendingByMessageId.has(messageId)) return;

      const userPubkey = normalizePubkeyHex(state.user.pubkey);
      if (!userPubkey) return;
      state.chatLikePublishPendingByMessageId.add(messageId);

      const likedSet = state.chatLikePubkeysByMessageId.get(messageId) || new Set();
      const wasLiked = likedSet.has(userPubkey);
      const previousOwnReactionId = state.chatOwnLikeEventByMessageId.get(messageId) || '';

      try {
        if (wasLiked) {
          if (state.chatLikePubkeysByMessageId.has(messageId)) {
            state.chatLikePubkeysByMessageId.get(messageId).delete(userPubkey);
            if (!state.chatLikePubkeysByMessageId.get(messageId).size) state.chatLikePubkeysByMessageId.delete(messageId);
          }
          state.chatOwnLikeEventByMessageId.delete(messageId);
          updateChatLikeUi(messageId);

          let reactionId = previousOwnReactionId;
          if (!reactionId) {
            reactionId = await findOwnChatLikeReactionId(messageId, stream);
          }

          if (reactionId) {
            await signAndPublish(KIND_DELETION, 'unliked chat message', [['e', reactionId], ['k', String(KIND_REACTION)], ['a', stream.address]]);
            applyChatUnlikeByReactionId(reactionId);
          } else {
            await signAndPublish(KIND_REACTION, '-', [['e', messageId], ['p', messageEvent.pubkey], ['a', stream.address]]);
          }
          updateChatLikeUi(messageId);
        } else {
          applyChatLikeReaction(messageId, userPubkey, '');
          updateChatLikeUi(messageId);

          const likeEv = await signAndPublish(KIND_REACTION, '+', [['e', messageId], ['p', messageEvent.pubkey], ['a', stream.address]]);
          if (likeEv && likeEv.id) applyChatLikeReaction(messageId, userPubkey, likeEv.id);
          updateChatLikeUi(messageId);
        }
      } catch (err) {
        if (wasLiked) {
          applyChatLikeReaction(messageId, userPubkey, previousOwnReactionId);
        } else {
          const set = state.chatLikePubkeysByMessageId.get(messageId);
          if (set) {
            set.delete(userPubkey);
            if (!set.size) state.chatLikePubkeysByMessageId.delete(messageId);
          }
          state.chatOwnLikeEventByMessageId.delete(messageId);
        }
        updateChatLikeUi(messageId);
        alert(err.message || 'Failed to update chat like.');
      } finally {
        state.chatLikePublishPendingByMessageId.delete(messageId);
      }
    };

    window.toggleTheaterFollow = async function () {
      const stream = state.streamsByAddress.get(state.selectedStreamAddress);
      if (!stream) return;
      if (!state.user) { window.openLogin(); return; }
      const pubkey = normalizePubkeyHex(stream.hostPubkey);
      if (!pubkey) return;
      if (state.followPublishPending) return;
      state.followPublishPending = true;

      try {
        const wasFollowing = isFollowingPubkey(pubkey);
        const next = !wasFollowing;
        setFollowingPubkey(pubkey, next);
        state.contactListPubkeys = new Set(state.followedPubkeys);
        updateOwnFollowingStat(next ? 1 : -1);
        updateTheaterFollowBtn(pubkey);
        renderLiveGrid();

        // Keep profile page in sync if it's open for the same person
        if (normalizePubkeyHex(state.selectedProfilePubkey) === pubkey) renderProfileFollowButton(pubkey);

        try {
          await publishFollowedPubkeysToNostr();
          state.contactListPubkeys = new Set(state.followedPubkeys);
          renderFollowingCount();
          renderLiveGrid();
        } catch (err) {
          setFollowingPubkey(pubkey, wasFollowing);
          state.contactListPubkeys = new Set(state.followedPubkeys);
          updateOwnFollowingStat(next ? -1 : 1);
          updateTheaterFollowBtn(pubkey);
          if (normalizePubkeyHex(state.selectedProfilePubkey) === pubkey) renderProfileFollowButton(pubkey);
          renderLiveGrid();
          alert(err.message || 'Failed to update follow list.');
        }
      } finally {
        state.followPublishPending = false;
      }
    };

    // ---- "Also Live Now" reco panel ----
    window.renderRecoStreams = function () {
      const list = qs('#recoList');
      if (!list) return;
      const current = state.selectedStreamAddress;
      const thumbClasses = ['t1','t2','t3','t4','t5','t6','t7','t8'];
      const others = sortedLiveStreams()
        .filter((s) => s.address !== current && s.status === 'live')
        .slice(0, 6);
      list.innerHTML = '';
      if (!others.length) {
        list.innerHTML = '<div style="font-size:.74rem;color:var(--muted);padding:.25rem .45rem;">No other live streams right now.</div>';
        return;
      }
      others.forEach((s, i) => {
        const p = profileFor(s.hostPubkey);
        const viewerCount = effectiveParticipants(s);
        const item = document.createElement('div');
        item.className = 'reco-item';
        item.innerHTML = `
          <div class="reco-thumb"><div class="tc ${thumbClasses[i % thumbClasses.length]}" style="height:100%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;"></div></div>
          <div class="reco-text"><div class="rt"></div><div class="rs"></div></div>`;
        qs('.rt', item).textContent = s.title || 'Untitled stream';
        qs('.rs', item).innerHTML = `${p.name || shortHex(s.hostPubkey)} - <span style="color:var(--live)">${viewerCount > 0 ? viewerCount.toLocaleString() + ' live' : 'live'}</span>`;
        if (s.image) {
          const thumb = qs('.reco-thumb', item);
          thumb.innerHTML = `<img src="${s.image}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`;
        }
        item.addEventListener('click', () => openStream(s.address));
        list.appendChild(item);
      });
    };

    // ---- Compose / post note on own profile ----
    window.profileComposeInput = function (el) {
      const max = 4096;
      const rem = max - (el.value || '').length;
      const chars = qs('#profileComposeChars');
      if (chars) {
        chars.textContent = `${rem}`;
        chars.style.color = rem < 50 ? 'var(--live)' : '';
      }
    };

    window.publishProfileNote = async function () {
      if (!state.user) { window.openLogin(); return; }
      const textarea = qs('#profileComposeText');
      const btn = qs('#profileComposeBtn');
      const text = (textarea && textarea.value || '').trim();
      if (!text) return;

      if (btn) { btn.disabled = true; btn.textContent = 'Postingâ€¦'; }
      try {
        await signAndPublish(1, text, []);
        if (textarea) textarea.value = '';
        window.profileComposeInput(textarea || { value: '' });
        // Refresh feed
        if (state.selectedProfilePubkey) {
          subscribeProfileFeed(state.selectedProfilePubkey);
        }
      } catch (err) {
        alert(err.message || 'Failed to post note.');
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = 'Post Note'; }
      }
    };

    // ---- Theater Zap ----
    window.theaterZap = async function () {
      const stream = state.streamsByAddress.get(state.selectedStreamAddress);
      if (!stream) return;
      if (!state.user) { window.openLogin(); return; }
      const p = profileFor(stream.hostPubkey);
      const lud16 = (p.lud16 || '').trim();
      if (!lud16) { alert('This streamer has no Lightning address (lud16) set on their Nostr profile.'); return; }
      if (window.webln) {
        try {
          await window.webln.enable();
          const zapAmountMsats = 21000;
          const zapTags = [['relays', ...state.relays], ['amount', String(zapAmountMsats)], ['p', stream.pubkey], ['e', stream.id]];
          const zapRequest = await signAndPublish(9734, '⚡ zapping from Sifaka Live', zapTags);
          const [user, domain] = lud16.split('@');
          const meta = await fetch(`https://${domain}/.well-known/lnurlp/${user}`).then((r) => r.json());
          if (!meta.callback) throw new Error('Invalid LNURL response.');
          const invoiceData = await fetch(`${meta.callback}?amount=${zapAmountMsats}&nostr=${encodeURIComponent(JSON.stringify(zapRequest))}`).then((r) => r.json());
          if (!invoiceData.pr) throw new Error('No payment request returned.');
          await window.webln.sendPayment(invoiceData.pr);
          const zapBtn = qs('#theaterZapBtn');
          if (zapBtn) { const o = zapBtn.innerHTML; zapBtn.textContent = '⚡ Zapped!'; setTimeout(() => { zapBtn.innerHTML = o; }, 2000); }
          return;
        } catch (err) { console.warn('WebLN zap failed:', err.message); }
      }
      window.open(`lightning:${lud16}`, '_blank');
    };

    // ---- Share stream ----
    window.closeShareModal = function (e) {
      const ov = qs('#shareModal');
      if (!ov) return;
      if (e && e.target !== ov) return;
      ov.classList.remove('open');
      state.shareModalStreamAddress = '';
    };

    window.copyShareField = async function (fieldId) {
      const input = qs(`#${fieldId}`);
      const val = input ? String(input.value || '').trim() : '';
      if (!val) return;
      try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(val);
          return;
        }
      } catch (_) {}
      window.prompt('Copy value:', val);
    };

    window.shareStreamAction = async function (mode) {
      const stream = state.streamsByAddress.get(state.shareModalStreamAddress || state.selectedStreamAddress);
      if (!stream) return;
      syncTheaterRoute(stream, 'replace');

      const url = (qs('#shareWebUrl') && qs('#shareWebUrl').value) || window.location.href;
      const text = stream.title ? `Watching "${stream.title}" live on Nostr` : 'Live stream on Nostr';
      const shareBody = `${text}\n${url}`;

      try {
        if (mode === 'boost') {
          if (!state.user) { window.openLogin(); return; }
          const repostTags = [['e', stream.id], ['p', stream.pubkey], ['a', stream.address]];
          const repostContent = stream.raw && stream.raw.id ? JSON.stringify(stream.raw) : '';
          const repostEv = await signAndPublish(6, repostContent, repostTags);
          state.boostedStreamAddresses.add(stream.address);
          if (repostEv && repostEv.id) state.streamBoostEventIdByAddress.set(stream.address, repostEv.id);
          state.streamBoostCheckedByAddress.add(stream.address);
          updateTheaterShareBtn(stream);
          window.closeShareModal();
          return;
        }

        if (mode === 'copy') {
          await window.copyShareField('shareWebUrl');
          return;
        }

        if (mode === 'app') {
          if (navigator.share) {
            await navigator.share({ title: text, text: shareBody, url });
            return;
          }
          window.open(`sms:?&body=${encodeURIComponent(shareBody)}`, '_blank');
        }
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        alert(err && err.message ? err.message : 'Share failed.');
      }
    };

    window.shareStream = async function () {
      const stream = state.streamsByAddress.get(state.selectedStreamAddress);
      if (!stream) return;

      syncTheaterRoute(stream, 'replace');
      state.shareModalStreamAddress = stream.address;

      const webUrl = window.location.href;
      const naddrInput = qs('#shareNaddr');
      const webInput = qs('#shareWebUrl');
      if (webInput) webInput.value = webUrl;

      const initialNaddr = encodeStreamNaddr(stream);
      if (naddrInput) naddrInput.value = initialNaddr || '';
      if (!initialNaddr) {
        ensureNostrTools().then(() => {
          const next = encodeStreamNaddr(stream);
          if (naddrInput) naddrInput.value = next || '';
        }).catch(() => {});
      }

      const ov = qs('#shareModal');
      if (ov) ov.classList.add('open');
    };

    const shareOv = qs('#shareModal');
    if (shareOv && !shareOv.dataset.boundOutsideClose) {
      shareOv.dataset.boundOutsideClose = '1';
      shareOv.addEventListener('click', (e) => {
        if (e.target === shareOv) window.closeShareModal(e);
      });
    }
    const reactionOv = qs('#reactionPickerModal');
    if (reactionOv && !reactionOv.dataset.boundOutsideClose) {
      reactionOv.dataset.boundOutsideClose = '1';
      reactionOv.addEventListener('click', (e) => {
        if (e.target === reactionOv) window.closeReactionPicker(e);
      });
    }

    // ---- Badge popup ----
    window.openBadgePopup = function ({ name, desc, image, id, issuer, definition, award }) {
      const ov = qs('#badgePopupOv');
      if (!ov) return;

      const imgWrap = qs('#badgePopupImgWrap');
      const nameEl = qs('#badgePopupName');
      const descEl = qs('#badgePopupDesc');
      const metaEl = qs('#badgePopupMeta');

      const info = badgeInfoFromEvents(award, definition);
      const finalName = (name || info.name || '').trim();
      const finalDesc = desc || info.desc || '';
      const finalId = (id || info.id || '').trim();
      const finalIssuer = (issuer || info.issuer || '').trim();

      if (nameEl) nameEl.textContent = finalName || 'Award';
      if (descEl) descEl.textContent = finalDesc;

      if (imgWrap) {
        imgWrap.innerHTML = '';
        const imageUrl = sanitizeMediaUrl(image || info.image || '');
        if (imageUrl && isLikelyUrl(imageUrl)) {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = finalName || 'Award';
          img.onerror = () => { imgWrap.textContent = ''; };
          imgWrap.appendChild(img);
        } else {
          imgWrap.textContent = '';
        }
      }

      if (metaEl) {
        metaEl.innerHTML = '';
        const rows = [];
        if (finalIssuer) rows.push({ lbl: 'Issued by', val: finalIssuer });
        if (finalId) rows.push({ lbl: 'Badge ID', val: finalId });
        if (definition) {
          if (definition.created_at) {
            rows.push({ lbl: 'Created', val: new Date(definition.created_at * 1000).toLocaleDateString() });
          }
        }
        if (award && award.created_at) {
          rows.push({ lbl: 'Awarded', val: new Date(award.created_at * 1000).toLocaleDateString() });
        }
        rows.forEach(({ lbl, val }) => {
          const row = document.createElement('div');
          row.className = 'badge-popup-meta-row';
          row.innerHTML = `<span class="badge-popup-meta-lbl">${lbl}</span><span class="badge-popup-meta-val"></span>`;
          qs('.badge-popup-meta-val', row).textContent = val;
          metaEl.appendChild(row);
        });
      }

      ov.classList.add('open');
    };

    window.closeBadgePopup = function (e) {
      if (e && e.target !== qs('#badgePopupOv')) return;
      const ov = qs('#badgePopupOv');
      if (ov) ov.classList.remove('open');
    };

    // ---- All Badges popup ----
    window.openAllBadgesPopup = function (badges) {
      const ov = qs('#allBadgesPopupOv');
      const grid = qs('#allBadgesGrid');
      if (!ov || !grid) return;
      grid.innerHTML = '';
      badges.forEach(({ award, definition }) => {
        const chip = document.createElement('div');
        chip.className = 'profile-badge-chip';
        const info = badgeInfoFromEvents(award, definition);
        if (info.image && isLikelyUrl(info.image)) {
          const img = document.createElement('img');
          img.src = info.image; img.alt = info.name; img.loading = 'lazy';
          img.onerror = () => { chip.innerHTML = ''; };
          chip.appendChild(img);
        } else { chip.textContent = ''; }
        chip.title = info.name;
        chip.addEventListener('click', () => { openBadgePopup({ ...info, definition, award }); });
        grid.appendChild(chip);
      });
      ov.classList.add('open');
    };

    window.closeAllBadgesPopup = function (e) {
      if (e && e.target !== qs('#allBadgesPopupOv')) return;
      const ov = qs('#allBadgesPopupOv');
      if (ov) ov.classList.remove('open');
    };

    // ---- Sign out: clear all data, go home ----
    window.signOut = function () {
      try { localStorage.clear(); } catch (_) {}
      state.user = null; state.authMode = 'readonly'; state.localSecretKey = null;
      state.pendingOnboardingNsec = ''; state.selectedStreamAddress = null;
      state.selectedProfilePubkey = null; state.selectedProfileLiveAddress = null;
      state.followedPubkeys = new Set(); state.contactListPubkeys = new Set();
      state.contactsLatestCreatedAt = 0; state.contactsContent = '';
      state.contactsPTagByPubkey = new Map(); state.contactsOtherTags = [];
      state.followPublishPending = false;
      state.nip51Lists = new Map(); state.savedExternalLists = [];
      state.likedStreamAddresses = new Set();
      state.streamLikeEventIdByAddress = new Map();
      state.streamLikePublishPending = false;
      state.boostedStreamAddresses = new Set();
      state.streamBoostEventIdByAddress = new Map();
      state.streamBoostCheckedByAddress = new Set();
      state.streamBoostCheckPendingByAddress = new Set();
      state.streamReactionPubkeysByKey = new Map();
      state.streamReactionMetaByKey = new Map();
      state.streamReactionIdByKeyAndPubkey = new Map();
      state.streamReactionEventById = new Map();
      state.streamOwnReactionIdByKey = new Map();
      state.streamReactionPublishPendingByKey = new Set();
      state.chatLikePubkeysByMessageId = new Map();
      state.chatReactionIdByMessageAndPubkey = new Map();
      state.chatReactionEventById = new Map();
      state.chatOwnLikeEventByMessageId = new Map();
      state.chatMessageEventsById = new Map();
      state.chatLikePublishPendingByMessageId = new Set();
      state.postReactionPublishPendingByNoteAndKey = new Set();
      state.reactionPickerTarget = null;
      state.shareModalStreamAddress = '';
      state.goLiveSelectedAddress = '';
      state.goLiveHiddenEndedAddresses = new Set();
      if (state.profileStatusSubId && state.pool) {
        try { state.pool.unsubscribe(state.profileStatusSubId); } catch (_) {}
      }
      state.profileStatusSubId = null;
      state.profileStatusByPubkey = new Map();
      state.profileStatusSavePending = false;
      state.nip05VerificationByPubkey = new Map();
      state.nip05VerificationPendingByPubkey = new Set();
      state.nip05LookupCacheByNip05 = new Map();
      window.closeAllDD();
      ['goLiveModal','endModal','loginModal','settingsModal','faqModal','shareModal','reactionPickerModal'].forEach((id) => {
        const el = qs('#' + id); if (el) el.classList.remove('open');
      });
      setUserUi();
      stopAllAudio(null);
      setActiveViewerAddress('');
      window.showPage('home');
    };
  }

  function initEmojiPicker() {
    const emojis = [':)', ':D', '<3', ':fire:', ':zap:', ':rocket:', ':100:', ':wave:', ':music:', ':clap:'];
    const grid = qs('#epGrid');
    if (grid) {
      grid.innerHTML = '';
      emojis.forEach((emoji) => {
        const d = document.createElement('div');
        d.className = 'ep-emoji';
        d.textContent = emoji;
        d.onclick = () => {
          const input = qs('.chat-inp');
          if (input) input.value += emoji;
          window.closeEmoji();
        };
        grid.appendChild(d);
      });
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.chat-acts')) window.closeEmoji();
      if (!e.target.closest('.logo-wrap') && !e.target.closest('.nav-profile')) window.closeAllDD();
    });

    ['goLiveModal', 'endModal', 'loginModal', 'faqModal'].forEach((id) => {
      const el = qs(`#${id}`);
      if (!el) return;
      el.addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('open');
      });
    });
  }

  function initRelay() {
    rebuildRelayPool();
  }

  async function init() {
    loadSettingsFromStorage();
    loadFollowedPubkeys();
    loadSavedExternalLists();
    applySettingsToDocument();
    restoreRouteFromSpaFallbackQuery();

    bindLegacyGlobals();
    initEmojiPicker();
    wireEvents();
    window.addEventListener('popstate', () => {
      syncViewFromLocation({ fallbackMode: 'skip' });
    });

    const logoBtn = qs('#logoBtn');
    if (logoBtn) logoBtn.addEventListener('click', (e) => { e.stopPropagation(); window.toggleDD('logo'); });
    const pill = qs('#navUserPill');
    if (pill) pill.addEventListener('click', (e) => { e.stopPropagation(); window.toggleDD('profile'); });

    initRelay();
    await tryRestoreLocalLogin();
    setUserUi();
    syncViewFromLocation({ fallbackMode: 'replace' });

    // Render saved external lists immediately (they come from localStorage)
    renderListFilterDD();
    renderLiveGrid();
  }

  document.addEventListener('DOMContentLoaded', init);
})();


~~~

## README.md
~~~md
# Sifaka Live
www.Sifaka.Live

Sifaka.live is an experimental **decentralized livestreaming platform built on Nostr**.

It allows creators to stream content while leveraging the **Nostr protocol for identity, chat, discovery, and social interaction**, removing the need for centralized accounts.

The goal of the project is to build a **Twitch-style experience powered entirely by Nostr identities (npub/nsec)**.

## Communities (Discord-style) integration

A new **Sifaka Community** feature is integrated into the existing app shell:

- Uses the existing Sifaka Live navigation and routing.
- Opens from the existing **Communities** nav dropdown action.
- Mounts inside the app as an in-app page (`#communitiesPage`), not a separate rewrite.
- Source lives in `communities/`.
- Architecture/docs live in `docs/communities/`.

# Status

âš ï¸ **Project is currently in active development and experimental.**

Expect bugs, missing features, and UI changes as development continues.

Contributions and testing feedback are welcome.

~~~

## communities/boot.js
~~~js
import { createCommunityStore } from './store.js';
import { createNostrBridge } from './nostr.js';
import { createCommunitiesUI } from './ui.js';

let app = null;

function getContext() {
  const ctx = window.__SIFAKA_CONTEXT || {};
  const relays = typeof ctx.getRelays === 'function' ? (ctx.getRelays() || []) : [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.snort.social'
  ];

  const user = typeof ctx.getUser === 'function' ? ctx.getUser() : null;

  return {
    relays,
    userPubkey: user && user.pubkey ? user.pubkey : 'pub_craig',
    ctx
  };
}

function ensureApp() {
  if (app) return app;

  const root = document.getElementById('communitiesRoot');
  if (!root) return null;

  const context = getContext();
  const store = createCommunityStore({
    currentUserPubkey: context.userPubkey
  });
  const nostrBridge = createNostrBridge({ relays: context.relays });
  const ui = createCommunitiesUI({ root, store, nostrBridge, appContext: context.ctx });

  nostrBridge.connectAll();

  app = {
    mount() {
      ui.mount();
    },
    unmount() {
      ui.unmount();
    },
    refreshContext() {
      // For now this is a no-op because store is local.
      // Kept so auth/session transitions can rebind in future.
    },
    capabilities() {
      return nostrBridge.capabilities();
    }
  };

  return app;
}

window.SifakaCommunities = {
  mount() {
    const instance = ensureApp();
    if (instance) instance.mount();
  },
  unmount() {
    if (app) app.unmount();
  },
  refreshContext() {
    if (app) app.refreshContext();
  },
  capabilities() {
    return app ? app.capabilities() : null;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  ensureApp();
});

~~~

## communities/communities.css
~~~css
/* Sifaka Community styles.
   Uses existing Sifaka CSS variables for visual consistency. */

#communitiesPage {
  display: none;
  padding-top: 56px;
  min-height: 100vh;
  background: radial-gradient(1200px 600px at 0% 0%, rgba(232,70,10,.06), transparent 45%), var(--bg);
}

.sc-wrap {
  display: grid;
  grid-template-columns: 74px 280px minmax(0, 1fr) 290px;
  min-height: calc(100vh - 56px);
  color: var(--text);
}

.sc-server-rail,
.sc-channel-col,
.sc-main,
.sc-member-col {
  min-height: calc(100vh - 56px);
}

.sc-server-rail {
  border-right: 1px solid var(--border);
  background: rgba(8,11,15,.88);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .7rem;
  padding: .7rem .45rem;
}

.sc-rail-top {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border2);
  background: linear-gradient(135deg, rgba(232,70,10,.3), rgba(247,183,49,.22));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'DM Mono', monospace;
  font-size: .72rem;
  font-weight: 700;
}

.sc-server-list {
  display: flex;
  flex-direction: column;
  gap: .55rem;
  width: 100%;
  align-items: center;
}

.sc-server-pill,
.sc-server-add {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border2);
  background: var(--surface2);
  color: var(--text2);
  cursor: pointer;
  transition: all .16s ease;
  font-family: 'DM Mono', monospace;
}

.sc-server-pill:hover,
.sc-server-add:hover {
  border-color: var(--accent);
  color: var(--text);
  transform: translateY(-1px);
}

.sc-server-pill.active {
  border-color: var(--accent);
  color: #fff;
  background: linear-gradient(145deg, rgba(232,70,10,.38), rgba(232,70,10,.2));
  box-shadow: 0 0 0 1px rgba(232,70,10,.35), 0 10px 22px rgba(232,70,10,.2);
}

.sc-unjoined-dot {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--zap);
}

.sc-channel-col {
  border-right: 1px solid var(--border);
  background: rgba(13,18,24,.95);
  display: flex;
  flex-direction: column;
}

.sc-channel-head {
  padding: .85rem .9rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: .5rem;
}

.sc-channel-head h2 {
  font-family: 'Syne', sans-serif;
  font-size: .98rem;
  font-weight: 700;
  margin: 0;
}

.sc-channel-head p {
  margin: .2rem 0 0;
  color: var(--muted);
  font-size: .66rem;
  font-family: 'DM Mono', monospace;
}

.sc-channel-head button,
.sc-main-actions button,
.sc-channel-footer button,
.sc-pop-actions button,
.sc-compose-foot button,
.sc-draft-tools button,
.sc-modal-foot button,
#scGenerateInviteBtn {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  border-radius: 8px;
  padding: .32rem .55rem;
  cursor: pointer;
  font-size: .7rem;
  font-family: 'DM Sans', sans-serif;
}

.sc-channel-head button:hover,
.sc-main-actions button:hover,
.sc-channel-footer button:hover,
.sc-pop-actions button:hover,
.sc-compose-foot button:hover,
.sc-draft-tools button:hover,
.sc-modal-foot button:hover,
#scGenerateInviteBtn:hover {
  color: var(--text);
  border-color: var(--accent);
}

.sc-channel-search {
  padding: .6rem .8rem;
}

.sc-channel-search input {
  width: 100%;
  background: #0b1117;
  border: 1px solid var(--border2);
  border-radius: 8px;
  color: var(--text);
  font-size: .76rem;
  padding: .44rem .58rem;
  outline: none;
}

.sc-channel-search input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(232,70,10,.18);
}

.sc-channel-list {
  flex: 1;
  overflow: auto;
  padding: .1rem .45rem .8rem;
}

.sc-category {
  margin-top: .45rem;
}

.sc-category header {
  color: var(--muted);
  font-size: .62rem;
  font-family: 'DM Mono', monospace;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: .28rem .48rem;
}

.sc-channel-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .4rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--text2);
  cursor: pointer;
  padding: .35rem .48rem;
  margin-bottom: .12rem;
  font-size: .75rem;
}

.sc-channel-btn:hover {
  background: var(--surface2);
  color: var(--text);
}

.sc-channel-btn.active {
  background: rgba(232,70,10,.1);
  border-color: rgba(232,70,10,.38);
  color: var(--text);
}

.sc-channel-meta b {
  background: var(--live);
  color: #fff;
  border-radius: 999px;
  font-family: 'DM Mono', monospace;
  font-size: .6rem;
  padding: .06rem .32rem;
}

.sc-channel-footer {
  border-top: 1px solid var(--border);
  padding: .62rem;
  display: flex;
  gap: .4rem;
}

.sc-channel-footer button {
  flex: 1;
}

.sc-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.sc-main-head {
  padding: .8rem .95rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .8rem;
}

.sc-main-head h3 {
  margin: 0;
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
}

.sc-main-head p {
  margin: .18rem 0 0;
  color: var(--text2);
  font-size: .72rem;
}

.sc-main-actions {
  display: flex;
  align-items: center;
  gap: .35rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.sc-feed {
  flex: 1;
  overflow: auto;
  padding: .75rem .9rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: .6rem;
}

.sc-message {
  display: flex;
  gap: .55rem;
  padding: .5rem;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: all .14s;
}

.sc-message:hover {
  background: rgba(255,255,255,.015);
  border-color: rgba(255,255,255,.04);
}

.sc-avatar {
  width: 34px;
  height: 34px;
  border: 1px solid var(--border2);
  border-radius: 50%;
  background: var(--surface3);
  color: var(--text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: .72rem;
  font-family: 'DM Mono', monospace;
  cursor: pointer;
}

.sc-avatar.big {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  font-size: .9rem;
}

.sc-message-main {
  min-width: 0;
  flex: 1;
}

.sc-message-main header {
  display: flex;
  align-items: center;
  gap: .35rem;
  flex-wrap: wrap;
}

.sc-author {
  background: none;
  border: 0;
  padding: 0;
  color: var(--text);
  font-size: .8rem;
  font-weight: 700;
  cursor: pointer;
}

.sc-author:hover { text-decoration: underline; }

.sc-message-main time {
  color: var(--muted);
  font-size: .65rem;
  font-family: 'DM Mono', monospace;
}

.sc-nip05 {
  color: var(--nip05);
  font-size: .63rem;
  font-family: 'DM Mono', monospace;
}

.sc-reply-tag {
  margin-top: .28rem;
  color: var(--muted);
  font-size: .64rem;
  font-family: 'DM Mono', monospace;
}

.sc-content {
  margin-top: .3rem;
  color: var(--text2);
  font-size: .78rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.sc-attachments {
  margin-top: .34rem;
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
}

.sc-attachments span,
.sc-attachment-preview span {
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 999px;
  font-family: 'DM Mono', monospace;
  font-size: .63rem;
  color: var(--text2);
  padding: .14rem .45rem;
}

.sc-message footer {
  margin-top: .38rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
}

.sc-reactions {
  display: flex;
  flex-wrap: wrap;
  gap: .24rem;
}

.sc-react-chip {
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  border-radius: 999px;
  cursor: pointer;
  font-size: .64rem;
  font-family: 'DM Mono', monospace;
  padding: .12rem .42rem;
}

.sc-react-chip.active {
  border-color: var(--accent);
  color: var(--text);
  background: rgba(232,70,10,.12);
}

.sc-actions {
  display: flex;
  gap: .28rem;
}

.sc-actions button {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  border-radius: 7px;
  padding: .16rem .36rem;
  font-size: .63rem;
  cursor: pointer;
}

.sc-actions button:hover {
  color: var(--text2);
  border-color: var(--border2);
}

.sc-composer {
  border-top: 1px solid var(--border);
  padding: .6rem .82rem;
  position: relative;
}

.sc-draft-tools {
  display: flex;
  align-items: center;
  gap: .32rem;
  margin-bottom: .42rem;
}

.sc-attach-label {
  cursor: pointer;
}

.sc-composer textarea {
  width: 100%;
  min-height: 74px;
  max-height: 210px;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid var(--border2);
  background: #0b1118;
  color: var(--text);
  padding: .54rem .66rem;
  font-size: .8rem;
  font-family: 'DM Sans', sans-serif;
  outline: none;
}

.sc-composer textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(232,70,10,.16);
}

.sc-compose-foot {
  margin-top: .46rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .45rem;
}

.sc-compose-foot small {
  color: var(--muted);
  font-size: .65rem;
  font-family: 'DM Mono', monospace;
}

.sc-emoji-pop {
  position: absolute;
  bottom: calc(100% + 6px);
  left: .82rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .28rem;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: .45rem;
  width: 220px;
  box-shadow: 0 20px 50px rgba(0,0,0,.75);
  z-index: 20;
}

.sc-emoji-pop button {
  border: 1px solid var(--border2);
  background: var(--surface2);
  color: var(--text);
  border-radius: 7px;
  font-size: .74rem;
  padding: .3rem;
  cursor: pointer;
}

.sc-member-col {
  border-left: 1px solid var(--border);
  background: rgba(13,18,24,.9);
  display: flex;
  flex-direction: column;
}

.sc-member-col header {
  padding: .8rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sc-member-col h4 {
  margin: 0;
  font-size: .83rem;
  font-family: 'Syne', sans-serif;
}

.sc-member-list {
  flex: 1;
  overflow: auto;
  padding: .55rem;
  display: flex;
  flex-direction: column;
  gap: .2rem;
}

.sc-member-row {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 9px;
  color: var(--text2);
  display: flex;
  align-items: center;
  gap: .45rem;
  text-align: left;
  cursor: pointer;
  padding: .34rem .4rem;
}

.sc-member-row:hover {
  border-color: rgba(255,255,255,.06);
  background: rgba(255,255,255,.015);
}

.sc-member-main {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.sc-member-main strong {
  font-size: .74rem;
  color: var(--text);
}

.sc-member-main small {
  font-size: .62rem;
  color: var(--muted);
  font-family: 'DM Mono', monospace;
}

.sc-popout {
  position: fixed;
  right: 302px;
  top: 88px;
  width: 290px;
  border: 1px solid var(--border2);
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 28px 60px rgba(0,0,0,.75);
  padding: .72rem;
  z-index: 80;
}

.sc-popout-close {
  position: absolute;
  right: .4rem;
  top: .34rem;
  border: 0;
  background: none;
  color: var(--muted);
  font-size: .95rem;
  cursor: pointer;
}

.sc-pop-head {
  display: flex;
  align-items: center;
  gap: .5rem;
}

.sc-pop-head h5 {
  margin: 0;
  font-size: .88rem;
}

.sc-pop-head small,
.sc-popout p,
.sc-pop-meta {
  color: var(--text2);
  font-size: .69rem;
}

.sc-pop-meta {
  margin-top: .42rem;
  display: flex;
  flex-wrap: wrap;
  gap: .25rem;
  font-family: 'DM Mono', monospace;
}

.sc-pop-actions {
  margin-top: .48rem;
  display: flex;
  flex-wrap: wrap;
  gap: .26rem;
}

.sc-modal-ov {
  position: fixed;
  inset: 0;
  z-index: 95;
  background: rgba(6,8,12,.74);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sc-modal {
  width: min(760px, 94vw);
  max-height: 90vh;
  overflow: auto;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 14px;
  padding: .92rem;
}

.sc-modal h4 {
  margin: 0;
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
}

.sc-modal p {
  margin: .42rem 0 .72rem;
  color: var(--text2);
  font-size: .76rem;
}

.sc-form-grid {
  display: grid;
  gap: .45rem;
}

.sc-form-grid label {
  display: flex;
  flex-direction: column;
  gap: .2rem;
  color: var(--text2);
  font-size: .68rem;
}

.sc-form-grid input,
.sc-form-grid textarea,
.sc-form-grid select,
.sc-invite-row input {
  background: #0c131a;
  border: 1px solid var(--border2);
  border-radius: 8px;
  color: var(--text);
  padding: .42rem .55rem;
  font-size: .74rem;
  font-family: 'DM Sans', sans-serif;
}

.sc-modal-foot {
  margin-top: .72rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: .4rem;
}

.sc-table-wrap {
  overflow: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.sc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: .66rem;
}

.sc-table th,
.sc-table td {
  border-bottom: 1px solid var(--border);
  padding: .25rem .36rem;
  text-align: left;
}

.sc-table th {
  color: var(--muted);
  font-family: 'DM Mono', monospace;
  font-size: .6rem;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.sc-notif-list,
.sc-pin-list,
.sc-discovery-list {
  display: flex;
  flex-direction: column;
  gap: .35rem;
}

.sc-notif-row,
.sc-pin-row,
.sc-discovery-item {
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--surface2);
  padding: .44rem .52rem;
  color: var(--text2);
  display: flex;
  flex-direction: column;
  gap: .1rem;
}

.sc-notif-row.unread {
  border-color: rgba(232,70,10,.5);
}

.sc-discovery-item {
  cursor: pointer;
  text-align: left;
}

.sc-discovery-item:hover {
  border-color: var(--accent);
}

.sc-context {
  position: fixed;
  z-index: 120;
  background: var(--surface);
  border: 1px solid var(--border2);
  border-radius: 10px;
  padding: .35rem;
  min-width: 170px;
  display: flex;
  flex-direction: column;
  gap: .18rem;
  box-shadow: 0 18px 42px rgba(0,0,0,.72);
}

.sc-context button {
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--text2);
  text-align: left;
  padding: .3rem .45rem;
  font-size: .72rem;
  cursor: pointer;
}

.sc-context button:hover {
  background: var(--surface2);
  border-color: var(--border2);
  color: var(--text);
}

.sc-empty {
  color: var(--muted);
  font-size: .74rem;
  border: 1px dashed var(--border2);
  border-radius: 10px;
  padding: .75rem;
}

@media (max-width: 1280px) {
  .sc-wrap {
    grid-template-columns: 64px 250px minmax(0, 1fr) 250px;
  }
  .sc-popout { right: 262px; }
}

@media (max-width: 1040px) {
  .sc-wrap {
    grid-template-columns: 58px 220px minmax(0, 1fr);
  }
  .sc-member-col {
    position: fixed;
    right: 0;
    top: 56px;
    bottom: 0;
    width: 260px;
    z-index: 65;
    transform: translateX(0);
    transition: transform .2s ease;
  }
  .sc-member-col.collapsed {
    transform: translateX(100%);
  }
  .sc-popout { right: 12px; top: 88px; }
}

@media (max-width: 820px) {
  .sc-wrap {
    grid-template-columns: 56px minmax(0, 1fr);
  }
  .sc-channel-col {
    position: fixed;
    left: 56px;
    top: 56px;
    bottom: 0;
    width: 248px;
    z-index: 70;
    transform: translateX(-100%);
    transition: transform .2s ease;
  }
  .sc-wrap.mobile-channels-open .sc-channel-col {
    transform: translateX(0);
  }
  .sc-main {
    grid-column: 2;
  }
  .sc-main-head {
    position: sticky;
    top: 56px;
    background: var(--surface);
    z-index: 40;
  }
}

~~~

## communities/mock-data.js
~~~js
import { DEFAULT_ROLE_DEFS } from './permissions.js';

const now = Date.now();
const min = 60 * 1000;

export const MOCK_PROFILES = {
  'pub_alice': {
    pubkey: 'pub_alice',
    name: 'alice',
    displayName: 'Alice Nostr',
    nip05: 'alice@sifaka.live',
    verifiedNip05: true,
    avatar: '',
    bio: 'Building Nostr-native communities.'
  },
  'pub_craig': {
    pubkey: 'pub_craig',
    name: 'craig',
    displayName: 'Craig',
    nip05: 'craig@bitcoin-cats.ca',
    verifiedNip05: true,
    avatar: '',
    bio: 'Streamer + community builder'
  },
  'pub_mod': {
    pubkey: 'pub_mod',
    name: 'relayrunner',
    displayName: 'Relay Runner',
    nip05: 'relayrunner@nostr.run',
    verifiedNip05: true,
    avatar: '',
    bio: 'Moderator and relay operator'
  },
  'pub_guest': {
    pubkey: 'pub_guest',
    name: 'newcomer',
    displayName: 'Newcomer',
    nip05: '',
    verifiedNip05: false,
    avatar: '',
    bio: 'Learning Nostr'
  }
};

export const MOCK_COMMUNITIES = [
  {
    id: 'n72:sifaka-builders',
    type: 'public',
    title: 'Sifaka Builders',
    icon: 'SB',
    description: 'Public NIP-72 builder community',
    banner: '',
    rules: ['Be respectful', 'No spam'],
    topics: ['nostr', 'livestream', 'dev'],
    ownerPubkey: 'pub_alice',
    joinMode: 'open',
    discoverable: true,
    defaultChannelId: 'ch:builders:general',
    allowedRelays: ['wss://relay.damus.io', 'wss://nos.lol'],
    roleDefs: DEFAULT_ROLE_DEFS,
    serverDefaultAllow: ['view_channels'],
    serverDefaultDeny: []
  },
  {
    id: 'n29:ops-room',
    type: 'private',
    title: 'Ops Room',
    icon: 'OR',
    description: 'Private NIP-29 style moderation and incident room',
    banner: '',
    rules: ['Confidential', 'Security-first'],
    topics: ['security', 'mod'],
    ownerPubkey: 'pub_craig',
    joinMode: 'approval',
    discoverable: false,
    defaultChannelId: 'ch:ops:incident',
    allowedRelays: ['wss://relay.snort.social'],
    roleDefs: DEFAULT_ROLE_DEFS,
    serverDefaultAllow: [],
    serverDefaultDeny: ['view_channels']
  }
];

export const MOCK_CHANNELS = {
  'n72:sifaka-builders': [
    {
      id: 'ch:builders:general',
      communityId: 'n72:sifaka-builders',
      category: 'Start Here',
      name: 'general',
      topic: 'Introductions and broad discussion',
      channelType: 'public',
      privacyLevel: 'public',
      slowModeSec: 0,
      archived: false,
      pinned: true,
      roleOverrides: []
    },
    {
      id: 'ch:builders:announcements',
      communityId: 'n72:sifaka-builders',
      category: 'Start Here',
      name: 'announcements',
      topic: 'Important updates',
      channelType: 'announcement',
      privacyLevel: 'public',
      slowModeSec: 30,
      archived: false,
      pinned: true,
      roleOverrides: [
        { roleId: 'member', allow: ['view_channels', 'react'], deny: ['post_messages'] }
      ]
    },
    {
      id: 'ch:builders:forum',
      communityId: 'n72:sifaka-builders',
      category: 'Development',
      name: 'feature-requests',
      topic: 'Forum-like channel for RFC threads',
      channelType: 'forum',
      privacyLevel: 'public',
      slowModeSec: 5,
      archived: false,
      pinned: false,
      roleOverrides: []
    }
  ],
  'n29:ops-room': [
    {
      id: 'ch:ops:incident',
      communityId: 'n29:ops-room',
      category: 'Security',
      name: 'incident-room',
      topic: 'Active incidents and response',
      channelType: 'private',
      privacyLevel: 'invite_only',
      slowModeSec: 3,
      archived: false,
      pinned: true,
      roleOverrides: [
        { roleId: 'guest', allow: [], deny: ['view_channels'] },
        { roleId: 'member', allow: [], deny: ['view_channels'] },
        { roleId: 'moderator', allow: ['view_channels', 'post_messages', 'react'], deny: [] },
        { roleId: 'admin', allow: ['view_channels', 'post_messages', 'react'], deny: [] }
      ]
    }
  ]
};

export const MOCK_MEMBERS = {
  'n72:sifaka-builders': [
    { pubkey: 'pub_alice', roles: ['owner'], joinedAt: now - 100 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_craig', roles: ['admin'], joinedAt: now - 80 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_mod', roles: ['moderator'], joinedAt: now - 60 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_guest', roles: ['member'], joinedAt: now - 20 * min, muted: false, banned: false, timeoutUntil: 0 }
  ],
  'n29:ops-room': [
    { pubkey: 'pub_craig', roles: ['owner'], joinedAt: now - 90 * min, muted: false, banned: false, timeoutUntil: 0 },
    { pubkey: 'pub_mod', roles: ['moderator'], joinedAt: now - 50 * min, muted: false, banned: false, timeoutUntil: 0 }
  ]
};

export const MOCK_MESSAGES = {
  'ch:builders:general': [
    {
      id: 'm:1',
      channelId: 'ch:builders:general',
      authorPubkey: 'pub_alice',
      content: 'Welcome to Sifaka Community. This channel maps to public Nostr spaces.',
      createdAt: now - 40 * min,
      replyTo: '',
      threadRoot: '',
      pinned: true,
      reactions: { '+': ['pub_craig', 'pub_mod'], ':rocket:': ['pub_guest'] },
      attachments: []
    },
    {
      id: 'm:2',
      channelId: 'ch:builders:general',
      authorPubkey: 'pub_craig',
      content: 'Use #feature-requests for RFC-style threads. Also test nostr:nevent links.',
      createdAt: now - 28 * min,
      replyTo: 'm:1',
      threadRoot: 'm:1',
      pinned: false,
      reactions: { '+': ['pub_alice'] },
      attachments: [{ id: 'a:1', name: 'relay-notes.md', kind: 'file', url: '#' }]
    },
    {
      id: 'm:3',
      channelId: 'ch:builders:general',
      authorPubkey: 'pub_guest',
      content: 'Can someone explain role overrides? I only see read in announcements.',
      createdAt: now - 8 * min,
      replyTo: '',
      threadRoot: '',
      pinned: false,
      reactions: {},
      attachments: []
    }
  ],
  'ch:builders:announcements': [
    {
      id: 'm:4',
      channelId: 'ch:builders:announcements',
      authorPubkey: 'pub_alice',
      content: 'Release 0.1: Communities alpha integrated into Sifaka Live.',
      createdAt: now - 14 * min,
      replyTo: '',
      threadRoot: '',
      pinned: true,
      reactions: { '+': ['pub_craig', 'pub_mod', 'pub_guest'] },
      attachments: []
    }
  ],
  'ch:builders:forum': [
    {
      id: 'm:5',
      channelId: 'ch:builders:forum',
      authorPubkey: 'pub_mod',
      content: 'RFC: channel-scoped tags for NIP-72 posts. Thread here.',
      createdAt: now - 21 * min,
      replyTo: '',
      threadRoot: '',
      pinned: false,
      reactions: { ':fire:': ['pub_alice'] },
      attachments: []
    }
  ],
  'ch:ops:incident': [
    {
      id: 'm:6',
      channelId: 'ch:ops:incident',
      authorPubkey: 'pub_mod',
      content: 'Blocked spam wave from relay X. Added temporary slow mode.',
      createdAt: now - 17 * min,
      replyTo: '',
      threadRoot: '',
      pinned: true,
      reactions: { '+': ['pub_craig'] },
      attachments: []
    }
  ]
};

export const MOCK_NOTIFICATIONS = [
  { id: 'n:1', kind: 'mention', title: 'You were mentioned in #general', createdAt: now - 3 * min, unread: true },
  { id: 'n:2', kind: 'reaction', title: 'Alice reacted to your message', createdAt: now - 11 * min, unread: true },
  { id: 'n:3', kind: 'invite', title: 'Invite accepted: Ops Room', createdAt: now - 42 * min, unread: false }
];

export function cloneMockState() {
  return {
    profiles: JSON.parse(JSON.stringify(MOCK_PROFILES)),
    communities: JSON.parse(JSON.stringify(MOCK_COMMUNITIES)),
    channelsByCommunity: JSON.parse(JSON.stringify(MOCK_CHANNELS)),
    membersByCommunity: JSON.parse(JSON.stringify(MOCK_MEMBERS)),
    messagesByChannel: JSON.parse(JSON.stringify(MOCK_MESSAGES)),
    notifications: JSON.parse(JSON.stringify(MOCK_NOTIFICATIONS))
  };
}

~~~

## communities/nostr.js
~~~js
// Nostr protocol bridge for Communities.
// This layer keeps network/signing isolated from UI/state logic.

const NIP_FLAGS = {
  nip01: true,
  nip05: true,
  nip07: true,
  nip10: true,
  nip17: true,
  nip19: true,
  nip25: true,
  nip27: true,
  nip28: true,
  nip29: true,
  nip30: true,
  nip36: true,
  nip42: true,
  nip43: true,
  nip44: true,
  nip46: true,
  nip50: true,
  nip51: true,
  nip53: true,
  nip56: true,
  nip57: true,
  nip65: true,
  nip66: true,
  nip72: true,
  nip78: true
};

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function normalizeRelay(url) {
  const val = String(url || '').trim();
  return /^wss:\/\//i.test(val) ? val : '';
}

function computeEventIdFallback(ev) {
  const raw = JSON.stringify([0, ev.pubkey || '', ev.created_at || 0, ev.kind || 1, ev.tags || [], ev.content || '']);
  let h = 0;
  for (let i = 0; i < raw.length; i += 1) h = ((h << 5) - h) + raw.charCodeAt(i);
  return `local_${Math.abs(h).toString(16)}`;
}

function mapChannelToKind(channel) {
  const type = String(channel && channel.channelType || '').toLowerCase();
  if (type === 'public' || type === 'announcement' || type === 'forum') return 42; // NIP-28 channel message
  if (type === 'private' || type === 'invite_only') return 14; // placeholder for encrypted wrapper flow
  return 1;
}

function buildMessageTags(input) {
  const {
    communityId,
    channelId,
    channelName,
    replyTo = '',
    threadRoot = '',
    contentWarning = ''
  } = input || {};

  const tags = [];
  if (communityId) tags.push(['h', communityId]);
  if (channelId) tags.push(['t', `channel:${channelId}`]);
  if (channelName) tags.push(['alt', `Message in #${channelName}`]);
  if (replyTo) tags.push(['e', replyTo, '', 'reply']);
  if (threadRoot) tags.push(['e', threadRoot, '', 'root']);
  if (contentWarning) tags.push(['content-warning', contentWarning]); // NIP-36 style marker
  return tags;
}

export function createNostrBridge(options = {}) {
  const relays = (options.relays || []).map(normalizeRelay).filter(Boolean);
  const sockets = new Map();
  const publishQueue = [];

  const listeners = {
    event: new Set(),
    status: new Set()
  };

  function emit(type, payload) {
    const set = listeners[type];
    if (!set) return;
    set.forEach((fn) => {
      try { fn(payload); } catch (_) {}
    });
  }

  function on(type, fn) {
    const set = listeners[type];
    if (!set) return () => {};
    set.add(fn);
    return () => set.delete(fn);
  }

  function connectRelay(url) {
    if (!url || sockets.has(url)) return;
    let ws = null;
    try {
      ws = new WebSocket(url);
    } catch (_) {
      emit('status', { relay: url, state: 'error' });
      return;
    }

    ws.addEventListener('open', () => {
      emit('status', { relay: url, state: 'open' });
      while (publishQueue.length) {
        const ev = publishQueue.shift();
        try { ws.send(JSON.stringify(['EVENT', ev])); } catch (_) {}
      }
    });

    ws.addEventListener('close', () => emit('status', { relay: url, state: 'closed' }));
    ws.addEventListener('error', () => emit('status', { relay: url, state: 'error' }));
    ws.addEventListener('message', (msg) => {
      let data = null;
      try { data = JSON.parse(msg.data); } catch (_) { return; }
      if (!Array.isArray(data)) return;
      if (data[0] === 'EVENT') emit('event', data[2]);
    });

    sockets.set(url, ws);
  }

  function connectAll() {
    relays.forEach(connectRelay);
  }

  async function getPubkeyFromSigner() {
    if (!window.nostr || typeof window.nostr.getPublicKey !== 'function') return '';
    try {
      return await window.nostr.getPublicKey();
    } catch (_) {
      return '';
    }
  }

  async function signEvent(unsigned) {
    if (window.nostr && typeof window.nostr.signEvent === 'function') {
      return window.nostr.signEvent(unsigned);
    }

    const local = {
      ...unsigned,
      id: computeEventIdFallback(unsigned),
      sig: 'unsigned'
    };
    return local;
  }

  async function publish(event) {
    let sent = 0;
    sockets.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(JSON.stringify(['EVENT', event]));
          sent += 1;
        } catch (_) {}
      }
    });

    if (!sent) publishQueue.push(event);
    return sent;
  }

  async function publishChannelMessage(input) {
    const kind = mapChannelToKind(input.channel);
    const pubkey = input.pubkey || await getPubkeyFromSigner();
    const unsigned = {
      kind,
      created_at: nowSec(),
      pubkey,
      tags: buildMessageTags({
        communityId: input.communityId,
        channelId: input.channelId,
        channelName: input.channel && input.channel.name,
        replyTo: input.replyTo,
        threadRoot: input.threadRoot,
        contentWarning: input.contentWarning
      }),
      content: String(input.content || '')
    };

    const signed = await signEvent(unsigned);
    await publish(signed);
    return signed;
  }

  async function publishReaction(input) {
    const pubkey = input.pubkey || await getPubkeyFromSigner();
    const unsigned = {
      kind: 7,
      created_at: nowSec(),
      pubkey,
      tags: [
        ['e', input.messageId],
        ['h', input.communityId || ''],
        ['t', `channel:${input.channelId || ''}`]
      ],
      content: input.reaction || '+'
    };
    const signed = await signEvent(unsigned);
    await publish(signed);
    return signed;
  }

  function nip19Encode(type, payload) {
    if (!window.NostrTools || !window.NostrTools.nip19) return '';
    try {
      if (type === 'npub' && window.NostrTools.nip19.npubEncode) return window.NostrTools.nip19.npubEncode(payload);
      if (type === 'naddr' && window.NostrTools.nip19.naddrEncode) return window.NostrTools.nip19.naddrEncode(payload);
      if (type === 'note' && window.NostrTools.nip19.noteEncode) return window.NostrTools.nip19.noteEncode(payload);
    } catch (_) {
      return '';
    }
    return '';
  }

  function nip19Decode(value) {
    if (!window.NostrTools || !window.NostrTools.nip19 || !window.NostrTools.nip19.decode) return null;
    try {
      return window.NostrTools.nip19.decode(String(value || '').trim());
    } catch (_) {
      return null;
    }
  }

  function capabilities() {
    return {
      ...NIP_FLAGS,
      signerNip07: !!(window.nostr && typeof window.nostr.signEvent === 'function'),
      signerNip46: false,
      relays: relays.slice(),
      connectedRelays: Array.from(sockets.entries())
        .filter(([, ws]) => ws.readyState === WebSocket.OPEN)
        .map(([url]) => url)
    };
  }

  return {
    connectAll,
    on,
    publish,
    publishChannelMessage,
    publishReaction,
    getPubkeyFromSigner,
    nip19Encode,
    nip19Decode,
    capabilities
  };
}

~~~

## communities/permissions.js
~~~js
// Permission model used by Sifaka Community.
// Discord-like behavior:
// - Server defaults
// - Role stacking
// - Channel overrides
// - Explicit deny beats allow
// - Owner bypass

export const PERMISSIONS = [
  'view_channels',
  'post_messages',
  'reply_threads',
  'react',
  'attach_files',
  'edit_own_messages',
  'delete_own_messages',
  'delete_any_messages',
  'pin_messages',
  'invite_members',
  'approve_join_requests',
  'mute_timeout_ban',
  'manage_roles',
  'manage_channels',
  'manage_server',
  'manage_emoji',
  'create_live_rooms',
  'zap'
];

export const DEFAULT_ROLE_DEFS = {
  owner: {
    id: 'owner',
    name: 'Owner',
    color: '#f7b731',
    rank: 100,
    grants: [...PERMISSIONS]
  },
  admin: {
    id: 'admin',
    name: 'Admin',
    color: '#e8460a',
    rank: 80,
    grants: PERMISSIONS.filter((p) => p !== 'manage_server')
  },
  moderator: {
    id: 'moderator',
    name: 'Moderator',
    color: '#9b72ff',
    rank: 60,
    grants: [
      'view_channels',
      'post_messages',
      'reply_threads',
      'react',
      'attach_files',
      'edit_own_messages',
      'delete_own_messages',
      'delete_any_messages',
      'pin_messages',
      'invite_members',
      'mute_timeout_ban',
      'manage_channels'
    ]
  },
  member: {
    id: 'member',
    name: 'Member',
    color: '#00d48a',
    rank: 30,
    grants: [
      'view_channels',
      'post_messages',
      'reply_threads',
      'react',
      'attach_files',
      'edit_own_messages',
      'delete_own_messages',
      'invite_members',
      'zap'
    ]
  },
  guest: {
    id: 'guest',
    name: 'Guest',
    color: '#8fa3b5',
    rank: 10,
    grants: ['view_channels', 'react']
  }
};

function toSet(values) {
  return new Set(Array.isArray(values) ? values : []);
}

function resolveRole(roleDefs, roleId) {
  return roleDefs[roleId] || null;
}

export function roleStackSummary(roleDefs, roleIds) {
  return (roleIds || [])
    .map((id) => resolveRole(roleDefs, id))
    .filter(Boolean)
    .sort((a, b) => Number(b.rank || 0) - Number(a.rank || 0));
}

function collectServerGrants(roleDefs, roleIds, serverDefaultAllow = [], serverDefaultDeny = []) {
  const grants = new Set(serverDefaultAllow);
  const denies = new Set(serverDefaultDeny);
  roleStackSummary(roleDefs, roleIds).forEach((role) => {
    toSet(role.grants).forEach((perm) => grants.add(perm));
    toSet(role.denies).forEach((perm) => denies.add(perm));
  });
  return { grants, denies };
}

function mergeChannelOverrides(base, overridesForRoles = [], overridesForUser = null) {
  const grants = new Set(base.grants);
  const denies = new Set(base.denies);

  overridesForRoles.forEach((ovr) => {
    toSet(ovr && ovr.allow).forEach((p) => grants.add(p));
    toSet(ovr && ovr.deny).forEach((p) => denies.add(p));
  });

  if (overridesForUser) {
    toSet(overridesForUser.allow).forEach((p) => grants.add(p));
    toSet(overridesForUser.deny).forEach((p) => denies.add(p));
  }

  return { grants, denies };
}

export function computeEffectivePermissions(input) {
  const {
    roleDefs = DEFAULT_ROLE_DEFS,
    roleIds = ['guest'],
    serverDefaultAllow = [],
    serverDefaultDeny = [],
    channelRoleOverrides = [],
    channelUserOverride = null,
    isOwner = false
  } = input || {};

  if (isOwner) {
    return {
      allow: new Set(PERMISSIONS),
      deny: new Set()
    };
  }

  const base = collectServerGrants(roleDefs, roleIds, serverDefaultAllow, serverDefaultDeny);
  const merged = mergeChannelOverrides(base, channelRoleOverrides, channelUserOverride);
  const allow = merged.grants;
  const deny = merged.denies;

  // Explicit deny wins.
  deny.forEach((perm) => allow.delete(perm));

  return {
    allow,
    deny
  };
}

export function hasPermission(input, permission) {
  const effective = computeEffectivePermissions(input);
  return effective.allow.has(permission);
}

export function buildPermissionMatrix(roleDefs = DEFAULT_ROLE_DEFS) {
  const matrix = {};
  Object.values(roleDefs).forEach((role) => {
    matrix[role.id] = {};
    PERMISSIONS.forEach((perm) => {
      matrix[role.id][perm] = toSet(role.grants).has(perm);
    });
  });
  return matrix;
}

~~~

## communities/store.js
~~~js
import { cloneMockState } from './mock-data.js';
import { computeEffectivePermissions, DEFAULT_ROLE_DEFS } from './permissions.js';

function createEmitter() {
  const listeners = new Set();
  return {
    emit(payload) {
      listeners.forEach((fn) => {
        try { fn(payload); } catch (_) {}
      });
    },
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

function nowIso() {
  return new Date().toISOString();
}

function byCreatedAt(a, b) {
  return Number(a.createdAt || 0) - Number(b.createdAt || 0);
}

function nextId(prefix) {
  return `${prefix}:${Math.random().toString(36).slice(2, 10)}:${Date.now().toString(36)}`;
}

export function createCommunityStore(options = {}) {
  const { currentUserPubkey = 'pub_craig', featureFlags = {} } = options;

  const data = cloneMockState();
  const emitter = createEmitter();

  const state = {
    data,
    currentUserPubkey,
    activeCommunityId: data.communities[0] ? data.communities[0].id : '',
    activeChannelId: data.communities[0] ? data.communities[0].defaultChannelId : '',
    joinedCommunityIds: new Set(data.communities.map((c) => c.id)),
    unreadByChannel: new Map(),
    draftsByChannel: new Map(),
    searchTerm: '',
    notificationsOpen: false,
    memberPanelOpen: true,
    featureFlags: {
      nip17Dm: true,
      nip29PrivateGroups: true,
      nip72PublicCommunities: true,
      nip53LiveRooms: false,
      nip46RemoteSigner: false,
      nip50SearchRelay: true,
      ...featureFlags
    },
    inviteCodesByCommunity: new Map(),
    pinnedByChannel: new Map()
  };

  Object.keys(state.data.messagesByChannel).forEach((channelId) => {
    const channelMessages = state.data.messagesByChannel[channelId] || [];
    const pins = channelMessages.filter((m) => m.pinned).map((m) => m.id);
    state.pinnedByChannel.set(channelId, pins);
  });

  function getCommunity(id = state.activeCommunityId) {
    return state.data.communities.find((c) => c.id === id) || null;
  }

  function getChannels(communityId = state.activeCommunityId) {
    return (state.data.channelsByCommunity[communityId] || []).slice();
  }

  function getChannel(channelId = state.activeChannelId) {
    const channels = getChannels();
    return channels.find((c) => c.id === channelId) || null;
  }

  function getMember(communityId = state.activeCommunityId, pubkey = state.currentUserPubkey) {
    const list = state.data.membersByCommunity[communityId] || [];
    return list.find((m) => m.pubkey === pubkey) || null;
  }

  function getMemberRoles(communityId = state.activeCommunityId, pubkey = state.currentUserPubkey) {
    const member = getMember(communityId, pubkey);
    return member ? (member.roles || ['guest']) : ['guest'];
  }

  function getRoleOverridesForChannel(channel, roleIds) {
    const overrides = Array.isArray(channel && channel.roleOverrides) ? channel.roleOverrides : [];
    return overrides.filter((ovr) => roleIds.includes(ovr.roleId));
  }

  function getPermissionContext(channel = getChannel(), community = getCommunity()) {
    const roleDefs = (community && community.roleDefs) || DEFAULT_ROLE_DEFS;
    const roleIds = getMemberRoles(community && community.id, state.currentUserPubkey);
    const isOwner = roleIds.includes('owner') || (community && community.ownerPubkey === state.currentUserPubkey);
    const channelRoleOverrides = getRoleOverridesForChannel(channel, roleIds);

    return {
      roleDefs,
      roleIds,
      isOwner,
      serverDefaultAllow: (community && community.serverDefaultAllow) || [],
      serverDefaultDeny: (community && community.serverDefaultDeny) || [],
      channelRoleOverrides,
      channelUserOverride: null
    };
  }

  function can(permission, channel = getChannel(), community = getCommunity()) {
    return computeEffectivePermissions(getPermissionContext(channel, community)).allow.has(permission);
  }

  function getMessages(channelId = state.activeChannelId) {
    return (state.data.messagesByChannel[channelId] || []).slice().sort(byCreatedAt);
  }

  function getPinnedMessages(channelId = state.activeChannelId) {
    const pinIds = new Set(state.pinnedByChannel.get(channelId) || []);
    return getMessages(channelId).filter((m) => pinIds.has(m.id));
  }

  function getProfiles() {
    return state.data.profiles;
  }

  function profile(pubkey) {
    return state.data.profiles[pubkey] || {
      pubkey,
      name: `${pubkey.slice(0, 8)}...`,
      displayName: `${pubkey.slice(0, 8)}...`,
      nip05: '',
      verifiedNip05: false,
      avatar: '',
      bio: ''
    };
  }

  function markRead(channelId = state.activeChannelId) {
    state.unreadByChannel.set(channelId, 0);
    emitter.emit({ type: 'read', channelId });
  }

  function incrementUnread(channelId) {
    const current = Number(state.unreadByChannel.get(channelId) || 0);
    state.unreadByChannel.set(channelId, current + 1);
  }

  function appendMessage(channelId, message) {
    if (!state.data.messagesByChannel[channelId]) state.data.messagesByChannel[channelId] = [];
    state.data.messagesByChannel[channelId].push(message);
    if (channelId !== state.activeChannelId) incrementUnread(channelId);
  }

  function sendMessage(payload) {
    const { channelId = state.activeChannelId, content = '', attachments = [], replyTo = '' } = payload || {};
    const channel = getChannels().find((c) => c.id === channelId) || getChannel(channelId);
    const community = getCommunity();

    if (!channel || !community) return { ok: false, reason: 'missing_channel' };
    if (!can('post_messages', channel, community)) return { ok: false, reason: 'permission_denied' };

    const text = String(content || '').trim();
    if (!text && (!attachments || !attachments.length)) return { ok: false, reason: 'empty' };

    const message = {
      id: nextId('m'),
      channelId,
      authorPubkey: state.currentUserPubkey,
      content: text,
      createdAt: Date.now(),
      createdAtIso: nowIso(),
      replyTo: replyTo || '',
      threadRoot: replyTo || '',
      pinned: false,
      reactions: {},
      attachments: (attachments || []).map((a) => ({
        id: nextId('a'),
        name: a.name || 'attachment',
        kind: a.kind || 'file',
        url: a.url || '#'
      }))
    };

    appendMessage(channelId, message);
    emitter.emit({ type: 'message_sent', message });
    markRead(channelId);

    return { ok: true, message };
  }

  function toggleReaction(channelId, messageId, key) {
    const list = state.data.messagesByChannel[channelId] || [];
    const msg = list.find((m) => m.id === messageId);
    if (!msg) return;
    if (!can('react')) return;

    if (!msg.reactions) msg.reactions = {};
    if (!msg.reactions[key]) msg.reactions[key] = [];

    const idx = msg.reactions[key].indexOf(state.currentUserPubkey);
    if (idx >= 0) msg.reactions[key].splice(idx, 1);
    else msg.reactions[key].push(state.currentUserPubkey);

    if (!msg.reactions[key].length) delete msg.reactions[key];

    emitter.emit({ type: 'reaction_toggled', channelId, messageId, key });
  }

  function togglePin(channelId, messageId) {
    if (!can('pin_messages')) return;
    const pinIds = new Set(state.pinnedByChannel.get(channelId) || []);
    if (pinIds.has(messageId)) pinIds.delete(messageId);
    else pinIds.add(messageId);
    state.pinnedByChannel.set(channelId, Array.from(pinIds));

    const list = state.data.messagesByChannel[channelId] || [];
    const msg = list.find((m) => m.id === messageId);
    if (msg) msg.pinned = pinIds.has(messageId);

    emitter.emit({ type: 'pin_toggled', channelId, messageId });
  }

  function setDraft(channelId, value) {
    state.draftsByChannel.set(channelId, String(value || ''));
    emitter.emit({ type: 'draft_changed', channelId });
  }

  function setSearch(term) {
    state.searchTerm = String(term || '').trim().toLowerCase();
    emitter.emit({ type: 'search_changed', term: state.searchTerm });
  }

  function setActiveCommunity(communityId) {
    const found = getCommunity(communityId);
    if (!found) return;
    state.activeCommunityId = communityId;
    const channels = getChannels(communityId);
    state.activeChannelId = channels[0] ? channels[0].id : '';
    markRead(state.activeChannelId);
    emitter.emit({ type: 'community_selected', communityId });
  }

  function setActiveChannel(channelId) {
    state.activeChannelId = channelId;
    markRead(channelId);
    emitter.emit({ type: 'channel_selected', channelId });
  }

  function joinCommunity(communityId) {
    state.joinedCommunityIds.add(communityId);
    emitter.emit({ type: 'community_joined', communityId });
  }

  function leaveCommunity(communityId) {
    state.joinedCommunityIds.delete(communityId);
    emitter.emit({ type: 'community_left', communityId });
    if (state.activeCommunityId === communityId) {
      const next = state.data.communities.find((c) => state.joinedCommunityIds.has(c.id));
      if (next) setActiveCommunity(next.id);
    }
  }

  function createInvite(communityId = state.activeCommunityId) {
    const code = `${communityId.split(':')[1]}-${Math.random().toString(36).slice(2, 8)}`;
    state.inviteCodesByCommunity.set(communityId, code);
    emitter.emit({ type: 'invite_created', communityId, code });
    return code;
  }

  function setMemberRole(communityId, pubkey, roleIds) {
    if (!can('manage_roles')) return;
    const list = state.data.membersByCommunity[communityId] || [];
    const member = list.find((m) => m.pubkey === pubkey);
    if (!member) return;
    member.roles = Array.from(new Set(roleIds || []));
    emitter.emit({ type: 'member_role_changed', communityId, pubkey });
  }

  function moderateMember(communityId, pubkey, action) {
    if (!can('mute_timeout_ban')) return;
    const list = state.data.membersByCommunity[communityId] || [];
    const member = list.find((m) => m.pubkey === pubkey);
    if (!member) return;

    if (action === 'mute') member.muted = true;
    if (action === 'unmute') member.muted = false;
    if (action === 'timeout_5m') member.timeoutUntil = Date.now() + (5 * 60 * 1000);
    if (action === 'ban') member.banned = true;
    if (action === 'kick') {
      state.data.membersByCommunity[communityId] = list.filter((m) => m.pubkey !== pubkey);
    }

    emitter.emit({ type: 'moderation_applied', communityId, pubkey, action });
  }

  function snapshot() {
    return {
      ...state,
      joinedCommunityIds: Array.from(state.joinedCommunityIds),
      unreadByChannel: new Map(state.unreadByChannel),
      draftsByChannel: new Map(state.draftsByChannel),
      inviteCodesByCommunity: new Map(state.inviteCodesByCommunity),
      pinnedByChannel: new Map(state.pinnedByChannel)
    };
  }

  function filteredMessages(channelId = state.activeChannelId) {
    const term = state.searchTerm;
    const list = getMessages(channelId);
    if (!term) return list;
    return list.filter((m) => String(m.content || '').toLowerCase().includes(term));
  }

  return {
    subscribe: emitter.subscribe,
    getState: snapshot,
    getCommunity,
    getChannels,
    getChannel,
    getMessages,
    getPinnedMessages,
    filteredMessages,
    getProfiles,
    profile,
    getMember,
    getMemberRoles,
    getPermissionContext,
    can,
    markRead,
    setDraft,
    setSearch,
    sendMessage,
    toggleReaction,
    togglePin,
    setActiveCommunity,
    setActiveChannel,
    joinCommunity,
    leaveCommunity,
    createInvite,
    setMemberRole,
    moderateMember
  };
}

~~~

## communities/ui.js
~~~js
import { PERMISSIONS, buildPermissionMatrix } from './permissions.js';

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fmtTime(ts) {
  const d = new Date(Number(ts || 0));
  if (!Number.isFinite(d.getTime())) return '--:--';
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function initials(name) {
  const raw = String(name || '?').trim();
  if (!raw) return '?';
  return raw.slice(0, 2).toUpperCase();
}

function groupedChannels(channels) {
  const map = new Map();
  (channels || []).forEach((ch) => {
    const key = ch.category || 'Channels';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(ch);
  });
  return Array.from(map.entries());
}

function roleLabel(profile, member) {
  const role = (member && member.roles && member.roles[0]) || 'guest';
  return `${profile.displayName || profile.name} - ${role}`;
}

export function createCommunitiesUI(input) {
  const { root, store, nostrBridge, appContext } = input;

  let mounted = false;
  let dispose = null;
  let ui = {
    openModal: '',
    selectedMember: '',
    composerAttachments: [],
    emojiOpen: false,
    contextMessageId: '',
    contextX: 0,
    contextY: 0,
    roleEditorMember: '',
    threadViewRoot: '',
    settingsTab: 'server',
    memberPanelOpen: true
  };

  function closeTransient() {
    ui.selectedMember = '';
    ui.openModal = '';
    ui.emojiOpen = false;
    ui.contextMessageId = '';
  }

  function permissionsSummary() {
    const matrix = buildPermissionMatrix();
    const keys = ['owner', 'admin', 'moderator', 'member', 'guest'];
    return `
      <div class="sc-table-wrap">
        <table class="sc-table">
          <thead>
            <tr><th>Permission</th>${keys.map((k) => `<th>${esc(k)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${PERMISSIONS.map((perm) => `
              <tr>
                <td>${esc(perm)}</td>
                ${keys.map((k) => `<td>${matrix[k] && matrix[k][perm] ? 'Y' : '-'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function render() {
    const state = store.getState();
    const community = store.getCommunity();
    const channel = store.getChannel();
    const channels = store.getChannels();
    const members = (state.data.membersByCommunity[community.id] || []);
    const profiles = store.getProfiles();
    const messages = store.filteredMessages();
    const pins = store.getPinnedMessages();
    const draft = state.draftsByChannel.get(channel.id) || '';
    const currentProfile = store.profile(state.currentUserPubkey);

    const joinedCommunityIds = new Set(state.joinedCommunityIds);

    const railHtml = state.data.communities.map((c) => {
      const active = c.id === state.activeCommunityId;
      const joined = joinedCommunityIds.has(c.id);
      return `
        <button class="sc-server-pill${active ? ' active' : ''}" data-community="${esc(c.id)}" title="${esc(c.title)}">
          <span>${esc(c.icon || initials(c.title))}</span>
          ${joined ? '' : '<i class="sc-unjoined-dot"></i>'}
        </button>
      `;
    }).join('');

    const channelHtml = groupedChannels(channels).map(([category, items]) => `
      <section class="sc-category">
        <header>${esc(category)}</header>
        ${items.map((ch) => {
          const unread = Number(state.unreadByChannel.get(ch.id) || 0);
          const locked = ch.privacyLevel !== 'public';
          return `
            <button class="sc-channel-btn${ch.id === channel.id ? ' active' : ''}" data-channel="${esc(ch.id)}" title="${esc(ch.topic || '')}">
              <span class="sc-channel-name"># ${esc(ch.name)}</span>
              <span class="sc-channel-meta">${locked ? 'private' : ''}${unread ? `<b>${unread}</b>` : ''}</span>
            </button>
          `;
        }).join('')}
      </section>
    `).join('');

    const memberHtml = members.map((m) => {
      const p = profiles[m.pubkey] || store.profile(m.pubkey);
      const timedOut = m.timeoutUntil && Number(m.timeoutUntil) > Date.now();
      return `
        <button class="sc-member-row" data-member="${esc(m.pubkey)}">
          <span class="sc-avatar">${esc(initials(p.displayName || p.name))}</span>
          <span class="sc-member-main">
            <strong>${esc(p.displayName || p.name)}</strong>
            <small>${esc((m.roles || ['guest']).join(', '))}${m.muted ? ' | muted' : ''}${timedOut ? ' | timeout' : ''}${m.banned ? ' | banned' : ''}</small>
          </span>
        </button>
      `;
    }).join('');

    const msgHtml = messages.map((m) => {
      const p = profiles[m.authorPubkey] || store.profile(m.authorPubkey);
      const reacts = Object.entries(m.reactions || {}).map(([key, who]) => {
        const active = (who || []).includes(state.currentUserPubkey);
        return `<button class="sc-react-chip${active ? ' active' : ''}" data-react-key="${esc(key)}" data-message="${esc(m.id)}">${esc(key)} ${Number((who || []).length)}</button>`;
      }).join('');

      return `
        <article class="sc-message" data-message-id="${esc(m.id)}">
          <button class="sc-avatar" data-member="${esc(m.authorPubkey)}">${esc(initials(p.displayName || p.name))}</button>
          <div class="sc-message-main">
            <header>
              <button class="sc-author" data-member="${esc(m.authorPubkey)}">${esc(p.displayName || p.name)}</button>
              <time>${esc(fmtTime(m.createdAt))}</time>
              ${(p.nip05 && p.verifiedNip05) ? `<span class="sc-nip05">${esc(p.nip05)}</span>` : ''}
            </header>
            ${m.replyTo ? `<div class="sc-reply-tag">Replying to ${esc(m.replyTo)}</div>` : ''}
            <div class="sc-content">${esc(m.content)}</div>
            ${(m.attachments || []).length ? `<div class="sc-attachments">${(m.attachments || []).map((a) => `<span>${esc(a.name)}</span>`).join('')}</div>` : ''}
            <footer>
              <div class="sc-reactions">${reacts}</div>
              <div class="sc-actions">
                <button data-action="reply" data-message="${esc(m.id)}">Reply</button>
                <button data-action="thread" data-message="${esc(m.id)}">Thread</button>
                <button data-action="pin" data-message="${esc(m.id)}">${m.pinned ? 'Unpin' : 'Pin'}</button>
                <button data-action="menu" data-message="${esc(m.id)}">...</button>
              </div>
            </footer>
          </div>
        </article>
      `;
    }).join('');

    const notificationUnread = state.data.notifications.filter((n) => n.unread).length;

    root.innerHTML = `
      <div class="sc-wrap" id="scWrap">
        <aside class="sc-server-rail">
          <div class="sc-rail-top">SC</div>
          <div class="sc-server-list">${railHtml}</div>
          <button class="sc-server-add" id="scDiscoverBtn">+</button>
        </aside>

        <aside class="sc-channel-col">
          <header class="sc-channel-head">
            <div>
              <h2>${esc(community.title)}</h2>
              <p>${esc(community.type === 'private' ? 'Private / NIP-29' : 'Public / NIP-72')}</p>
            </div>
            <button id="scServerSettingsBtn">?</button>
          </header>

          <div class="sc-channel-search">
            <input id="scSearchInput" value="${esc(state.searchTerm)}" placeholder="Search messages or channels" />
          </div>

          <div class="sc-channel-list">${channelHtml}</div>

          <footer class="sc-channel-footer">
            <button id="scInviteBtn">Invite</button>
            <button id="scJoinLeaveBtn">${joinedCommunityIds.has(community.id) ? 'Leave' : 'Join'}</button>
          </footer>
        </aside>

        <main class="sc-main">
          <header class="sc-main-head">
            <div>
              <h3># ${esc(channel.name)}</h3>
              <p>${esc(channel.topic || '')}</p>
            </div>
            <div class="sc-main-actions">
              <button id="scPinnedBtn">Pinned (${pins.length})</button>
              <button id="scChannelSettingsBtn">Channel Settings</button>
              <button id="scNotifBtn">Notifications${notificationUnread ? ` (${notificationUnread})` : ''}</button>
            </div>
          </header>

          <section class="sc-feed" id="scFeed">${msgHtml || '<div class="sc-empty">No messages yet.</div>'}</section>

          <section class="sc-composer">
            <div class="sc-draft-tools">
              <button id="scEmojiBtn">Emoji</button>
              <label class="sc-attach-label">Attach<input type="file" id="scAttachInput" multiple hidden></label>
              <button id="scDmHintBtn">DM</button>
            </div>
            ${(ui.composerAttachments || []).length ? `<div class="sc-attachment-preview">${ui.composerAttachments.map((f) => `<span>${esc(f.name)}</span>`).join('')}</div>` : ''}
            <textarea id="scComposer" placeholder="Message #${esc(channel.name)}">${esc(draft)}</textarea>
            <div class="sc-compose-foot">
              <small>${store.can('post_messages') ? 'Ready to publish via Nostr' : 'You do not have permission to post in this channel'}</small>
              <button id="scSendBtn" ${store.can('post_messages') ? '' : 'disabled'}>Send</button>
            </div>
            ${ui.emojiOpen ? `<div class="sc-emoji-pop" id="scEmojiPop">${[':)', ':D', '<3', ':fire:', ':zap:', ':rocket:', ':sifaka:'].map((e) => `<button data-emoji="${esc(e)}">${esc(e)}</button>`).join('')}</div>` : ''}
          </section>
        </main>

        <aside class="sc-member-col${ui.memberPanelOpen ? '' : ' collapsed'}">
          <header>
            <h4>Members (${members.length})</h4>
            <button id="scToggleMembersBtn">${ui.memberPanelOpen ? 'Hide' : 'Show'}</button>
          </header>
          <div class="sc-member-list">${memberHtml}</div>
        </aside>

        ${ui.selectedMember ? renderProfilePopout(ui.selectedMember, profiles, members, community, store) : ''}
        ${ui.openModal ? renderModal(ui.openModal, state, community, channel, members, profiles, store) : ''}
        ${ui.contextMessageId ? renderContextMenu(ui.contextMessageId, ui.contextX, ui.contextY) : ''}
      </div>
    `;

    bindHandlers();
  }

  function renderProfilePopout(pubkey, profiles, members, community, storeRef) {
    const p = profiles[pubkey] || storeRef.profile(pubkey);
    const m = (members || []).find((x) => x.pubkey === pubkey) || { roles: ['guest'] };

    return `
      <div class="sc-popout" id="scProfilePopout">
        <button class="sc-popout-close" data-close="member">x</button>
        <div class="sc-pop-head">
          <span class="sc-avatar big">${esc(initials(p.displayName || p.name))}</span>
          <div>
            <h5>${esc(p.displayName || p.name)}</h5>
            <small>${esc(roleLabel(p, m))}</small>
          </div>
        </div>
        <p>${esc(p.bio || '')}</p>
        <div class="sc-pop-meta">
          <span>${p.verifiedNip05 ? '[verified]' : '[unverified]'} ${esc(p.nip05 || 'No NIP-05')}</span>
          <span>${esc(community.id)}</span>
        </div>
        <div class="sc-pop-actions">
          <button data-member-action="mute" data-member="${esc(pubkey)}">Mute</button>
          <button data-member-action="timeout_5m" data-member="${esc(pubkey)}">Timeout</button>
          <button data-member-action="ban" data-member="${esc(pubkey)}">Ban</button>
          <button data-member-action="roles" data-member="${esc(pubkey)}">Roles</button>
        </div>
      </div>
    `;
  }

  function renderModal(key, state, community, channel, members, profiles, storeRef) {
    if (key === 'serverSettings') {
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Server Settings</h4>
            <p>Edit metadata and moderation controls for ${esc(community.title)}.</p>
            <div class="sc-form-grid">
              <label>Name<input value="${esc(community.title)}"></label>
              <label>Description<textarea>${esc(community.description || '')}</textarea></label>
              <label>Join Mode<select><option>${esc(community.joinMode)}</option></select></label>
              <label>Default Channel<select><option>${esc(community.defaultChannelId || '')}</option></select></label>
            </div>
            <h5>Permission Matrix</h5>
            ${permissionsSummary()}
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'channelSettings') {
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Channel Settings</h4>
            <p>#${esc(channel.name)}</p>
            <div class="sc-form-grid">
              <label>Topic<textarea>${esc(channel.topic || '')}</textarea></label>
              <label>Privacy<select><option>${esc(channel.privacyLevel || 'public')}</option></select></label>
              <label>Slow mode (s)<input value="${esc(channel.slowModeSec || 0)}"></label>
            </div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'invites') {
      const inviteCode = state.inviteCodesByCommunity.get(community.id) || '';
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Invite Members</h4>
            <p>Create an invite link for ${esc(community.title)}.</p>
            <div class="sc-invite-row">
              <input id="scInviteCode" readonly value="${esc(inviteCode ? `${location.origin}/communities/invite/${inviteCode}` : '')}">
              <button id="scGenerateInviteBtn">Generate</button>
            </div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'discovery') {
      const list = state.data.communities
        .filter((c) => c.discoverable)
        .map((c) => `<button class="sc-discovery-item" data-community="${esc(c.id)}"><strong>${esc(c.title)}</strong><small>${esc(c.description)}</small></button>`)
        .join('');
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Community Discovery (NIP-72)</h4>
            <div class="sc-discovery-list">${list || '<div class="sc-empty">No discovery data.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'notifications') {
      const rows = state.data.notifications
        .map((n) => `<div class="sc-notif-row${n.unread ? ' unread' : ''}"><strong>${esc(n.kind)}</strong><span>${esc(n.title)}</span><small>${esc(fmtTime(n.createdAt))}</small></div>`)
        .join('');
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Notifications</h4>
            <div class="sc-notif-list">${rows || '<div class="sc-empty">No notifications.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    if (key === 'roleEditor') {
      const member = members.find((m) => m.pubkey === ui.roleEditorMember);
      const p = profiles[ui.roleEditorMember] || storeRef.profile(ui.roleEditorMember);
      const roleOptions = ['owner', 'admin', 'moderator', 'member', 'guest'];
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Role Editor</h4>
            <p>${esc((p && (p.displayName || p.name)) || 'Member')}</p>
            <div class="sc-role-picker">
              ${roleOptions.map((r) => `<button class="sc-role-btn${member && member.roles.includes(r) ? ' active' : ''}" data-role="${esc(r)}">${esc(r)}</button>`).join('')}
            </div>
            <div class="sc-modal-foot">
              <button id="scSaveRolesBtn" ${!member ? 'disabled' : ''}>Save</button>
              <button data-close="modal">Close</button>
            </div>
          </div>
        </div>
      `;
    }

    if (key === 'pinned') {
      const rows = storeRef.getPinnedMessages().map((m) => `<div class="sc-pin-row"><strong>${esc(m.id)}</strong><span>${esc(m.content)}</span></div>`).join('');
      return `
        <div class="sc-modal-ov" data-close="modal">
          <div class="sc-modal">
            <h4>Pinned Messages</h4>
            <div class="sc-pin-list">${rows || '<div class="sc-empty">No pins yet.</div>'}</div>
            <div class="sc-modal-foot"><button data-close="modal">Close</button></div>
          </div>
        </div>
      `;
    }

    return '';
  }

  function renderContextMenu(messageId, x, y) {
    return `
      <div class="sc-context" style="left:${Number(x)}px;top:${Number(y)}px" data-context-menu>
        <button data-context-action="reply" data-message="${esc(messageId)}">Reply</button>
        <button data-context-action="thread" data-message="${esc(messageId)}">Open Thread</button>
        <button data-context-action="pin" data-message="${esc(messageId)}">Toggle Pin</button>
        <button data-context-action="report" data-message="${esc(messageId)}">Report (NIP-56)</button>
        <button data-context-action="delete" data-message="${esc(messageId)}">Delete</button>
      </div>
    `;
  }

  function bindHandlers() {
    root.querySelectorAll('[data-community]').forEach((el) => {
      el.addEventListener('click', () => {
        store.setActiveCommunity(el.getAttribute('data-community'));
        closeTransient();
      });
    });

    root.querySelectorAll('[data-channel]').forEach((el) => {
      el.addEventListener('click', () => {
        store.setActiveChannel(el.getAttribute('data-channel'));
        closeTransient();
      });
    });

    root.querySelectorAll('[data-member]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        ui.selectedMember = el.getAttribute('data-member');
        render();
      });
    });

    root.querySelectorAll('[data-close="member"]').forEach((el) => {
      el.addEventListener('click', () => {
        ui.selectedMember = '';
        render();
      });
    });

    root.querySelectorAll('[data-close="modal"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (e.target !== el && !el.classList.contains('sc-modal-foot')) return;
        ui.openModal = '';
        render();
      });
    });

    const search = root.querySelector('#scSearchInput');
    if (search) search.addEventListener('input', () => store.setSearch(search.value));

    const composer = root.querySelector('#scComposer');
    if (composer) {
      composer.addEventListener('input', () => store.setDraft(store.getState().activeChannelId, composer.value));
      composer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          const res = store.sendMessage({ content: composer.value, attachments: ui.composerAttachments });
          if (res.ok) {
            store.setDraft(store.getState().activeChannelId, '');
            ui.composerAttachments = [];
            if (nostrBridge) {
              const state = store.getState();
              const channel = store.getChannel();
              nostrBridge.publishChannelMessage({
                pubkey: state.currentUserPubkey,
                channel,
                communityId: state.activeCommunityId,
                channelId: state.activeChannelId,
                content: res.message.content,
                replyTo: res.message.replyTo,
                threadRoot: res.message.threadRoot
              }).catch(() => {});
            }
          }
        }
      });
    }

    const send = root.querySelector('#scSendBtn');
    if (send) {
      send.addEventListener('click', () => {
        const text = (composer && composer.value) || '';
        const res = store.sendMessage({ content: text, attachments: ui.composerAttachments });
        if (res.ok) {
          store.setDraft(store.getState().activeChannelId, '');
          ui.composerAttachments = [];
          if (nostrBridge) {
            const state = store.getState();
            const channel = store.getChannel();
            nostrBridge.publishChannelMessage({
              pubkey: state.currentUserPubkey,
              channel,
              communityId: state.activeCommunityId,
              channelId: state.activeChannelId,
              content: res.message.content,
              replyTo: res.message.replyTo,
              threadRoot: res.message.threadRoot
            }).catch(() => {});
          }
        }
      });
    }

    const attachInput = root.querySelector('#scAttachInput');
    if (attachInput) {
      attachInput.addEventListener('change', () => {
        ui.composerAttachments = Array.from(attachInput.files || []).map((f) => ({ name: f.name, kind: 'file', url: '#' }));
        render();
      });
    }

    const emojiBtn = root.querySelector('#scEmojiBtn');
    if (emojiBtn) {
      emojiBtn.addEventListener('click', () => {
        ui.emojiOpen = !ui.emojiOpen;
        render();
      });
    }

    root.querySelectorAll('[data-emoji]').forEach((el) => {
      el.addEventListener('click', () => {
        const value = el.getAttribute('data-emoji') || '';
        const current = store.getState();
        const draft = current.draftsByChannel.get(current.activeChannelId) || '';
        store.setDraft(current.activeChannelId, `${draft}${value} `);
      });
    });

    root.querySelectorAll('.sc-react-chip').forEach((el) => {
      el.addEventListener('click', () => {
        const messageId = el.getAttribute('data-message');
        const key = el.getAttribute('data-react-key');
        const state = store.getState();
        store.toggleReaction(state.activeChannelId, messageId, key);
        if (nostrBridge) {
          nostrBridge.publishReaction({
            communityId: state.activeCommunityId,
            channelId: state.activeChannelId,
            messageId,
            reaction: key,
            pubkey: state.currentUserPubkey
          }).catch(() => {});
        }
      });
    });

    root.querySelectorAll('[data-action="pin"]').forEach((el) => {
      el.addEventListener('click', () => {
        store.togglePin(store.getState().activeChannelId, el.getAttribute('data-message'));
      });
    });

    root.querySelectorAll('[data-action="reply"]').forEach((el) => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-message');
        const draft = store.getState().draftsByChannel.get(store.getState().activeChannelId) || '';
        store.setDraft(store.getState().activeChannelId, `? ${id} ${draft}`);
      });
    });

    root.querySelectorAll('[data-action="menu"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        ui.contextMessageId = el.getAttribute('data-message') || '';
        ui.contextX = e.clientX;
        ui.contextY = e.clientY;
        render();
      });
    });

    root.querySelectorAll('[data-context-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.getAttribute('data-context-action');
        const messageId = el.getAttribute('data-message');
        const channelId = store.getState().activeChannelId;

        if (action === 'pin') store.togglePin(channelId, messageId);
        if (action === 'reply') {
          const draft = store.getState().draftsByChannel.get(channelId) || '';
          store.setDraft(channelId, `? ${messageId} ${draft}`);
        }
        if (action === 'report') alert('Report flow queued (NIP-56).');
        if (action === 'delete') alert('Delete moderation action queued.');
        ui.contextMessageId = '';
        render();
      });
    });

    root.querySelectorAll('[data-member-action]').forEach((el) => {
      el.addEventListener('click', () => {
        const action = el.getAttribute('data-member-action');
        const pubkey = el.getAttribute('data-member');
        const state = store.getState();
        if (action === 'roles') {
          ui.openModal = 'roleEditor';
          ui.roleEditorMember = pubkey;
          render();
          return;
        }
        store.moderateMember(state.activeCommunityId, pubkey, action);
        ui.selectedMember = '';
        render();
      });
    });

    root.querySelectorAll('.sc-role-btn').forEach((el) => {
      el.addEventListener('click', () => {
        root.querySelectorAll('.sc-role-btn').forEach((btn) => btn.classList.remove('active'));
        el.classList.add('active');
      });
    });

    const saveRolesBtn = root.querySelector('#scSaveRolesBtn');
    if (saveRolesBtn) {
      saveRolesBtn.addEventListener('click', () => {
        const activeRole = root.querySelector('.sc-role-btn.active');
        if (!activeRole) return;
        const role = activeRole.getAttribute('data-role');
        const st = store.getState();
        store.setMemberRole(st.activeCommunityId, ui.roleEditorMember, [role]);
        ui.openModal = '';
        ui.roleEditorMember = '';
        render();
      });
    }

    const serverSettingsBtn = root.querySelector('#scServerSettingsBtn');
    if (serverSettingsBtn) serverSettingsBtn.addEventListener('click', () => { ui.openModal = 'serverSettings'; render(); });

    const channelSettingsBtn = root.querySelector('#scChannelSettingsBtn');
    if (channelSettingsBtn) channelSettingsBtn.addEventListener('click', () => { ui.openModal = 'channelSettings'; render(); });

    const pinnedBtn = root.querySelector('#scPinnedBtn');
    if (pinnedBtn) pinnedBtn.addEventListener('click', () => { ui.openModal = 'pinned'; render(); });

    const notifBtn = root.querySelector('#scNotifBtn');
    if (notifBtn) notifBtn.addEventListener('click', () => { ui.openModal = 'notifications'; render(); });

    const discoverBtn = root.querySelector('#scDiscoverBtn');
    if (discoverBtn) discoverBtn.addEventListener('click', () => { ui.openModal = 'discovery'; render(); });

    const inviteBtn = root.querySelector('#scInviteBtn');
    if (inviteBtn) inviteBtn.addEventListener('click', () => { ui.openModal = 'invites'; render(); });

    const generateInviteBtn = root.querySelector('#scGenerateInviteBtn');
    if (generateInviteBtn) {
      generateInviteBtn.addEventListener('click', () => {
        const code = store.createInvite();
        const field = root.querySelector('#scInviteCode');
        if (field) field.value = `${location.origin}/communities/invite/${code}`;
      });
    }

    const joinLeaveBtn = root.querySelector('#scJoinLeaveBtn');
    if (joinLeaveBtn) {
      joinLeaveBtn.addEventListener('click', () => {
        const st = store.getState();
        const joined = new Set(st.joinedCommunityIds);
        if (joined.has(st.activeCommunityId)) store.leaveCommunity(st.activeCommunityId);
        else store.joinCommunity(st.activeCommunityId);
      });
    }

    const memberToggle = root.querySelector('#scToggleMembersBtn');
    if (memberToggle) {
      memberToggle.addEventListener('click', () => {
        ui.memberPanelOpen = !ui.memberPanelOpen;
        render();
      });
    }

    document.addEventListener('click', onOutsideClick, { once: true });
  }

  function onOutsideClick(e) {
    const inMenu = e.target && e.target.closest && e.target.closest('[data-context-menu]');
    const inPop = e.target && e.target.closest && e.target.closest('#scProfilePopout');
    if (!inMenu) ui.contextMessageId = '';
    if (!inPop) ui.selectedMember = '';
    if (!inMenu || !inPop) render();
  }

  function mount() {
    if (mounted) return;
    mounted = true;
    render();
    dispose = store.subscribe(() => render());
  }

  function unmount() {
    if (!mounted) return;
    mounted = false;
    if (dispose) dispose();
    dispose = null;
    root.innerHTML = '';
  }

  return {
    mount,
    unmount,
    rerender: render
  };
}

~~~

## communities/README.md
~~~md
# Sifaka Community

Sifaka Community is the Discord-style Communities feature integrated into Sifaka Live.

## Goals
- Keep Sifaka Live navigation and design language.
- Add a modern community UI with server rail, channels, message feed, members, moderation controls, and settings.
- Use Nostr-native flows where possible with documented hybrid behavior for gaps.

## Folder structure
- `communities/boot.js` - entry point mounted by the main app.
- `communities/communities.css` - styles.
- `communities/store.js` - state and app actions.
- `communities/permissions.js` - Discord-like role/permission resolution.
- `communities/nostr.js` - Nostr protocol bridge.
- `communities/mock-data.js` - dev-mode local data.

## Run mode
This project currently runs as static HTML/JS. Communities supports:
- **Dev mode**: local mock data (works without relays).
- **Relay mode**: attempts Nostr relay publish via WebSocket and NIP-07 signer.

## Integration points
- Existing nav Communities button now calls `showCommunities()`.
- Main router (`showPage`) now supports `communities` view.
- Communities app mounts inside `#communitiesRoot`.

## Notes
- Private group and encrypted DM paths are structured for NIP-29/NIP-17/NIP-44, with hybrid fallback where relays do not support full flows yet.
- See docs in `docs/communities` for detailed protocol mapping.

~~~

## communities/tests/permissions.test.mjs
~~~js
import test from 'node:test';
import assert from 'node:assert/strict';
import { computeEffectivePermissions, hasPermission } from '../permissions.js';

test('owner bypass grants all', () => {
  const effective = computeEffectivePermissions({ isOwner: true, roleIds: ['guest'] });
  assert.equal(effective.allow.has('manage_server'), true);
  assert.equal(effective.allow.has('delete_any_messages'), true);
});

test('explicit deny beats allow', () => {
  const allowed = hasPermission({
    roleIds: ['member'],
    channelRoleOverrides: [
      { roleId: 'member', allow: ['post_messages'], deny: ['post_messages'] }
    ]
  }, 'post_messages');
  assert.equal(allowed, false);
});

test('role stacking allows moderator controls', () => {
  const canModerate = hasPermission({ roleIds: ['member', 'moderator'] }, 'mute_timeout_ban');
  assert.equal(canModerate, true);
});

~~~

## communities/tests/permissions.check.mjs
~~~js
import assert from 'node:assert/strict';
import { computeEffectivePermissions, hasPermission } from '../permissions.js';

const effective = computeEffectivePermissions({ isOwner: true, roleIds: ['guest'] });
assert.equal(effective.allow.has('manage_server'), true);
assert.equal(effective.allow.has('delete_any_messages'), true);

const allowed = hasPermission({
  roleIds: ['member'],
  channelRoleOverrides: [
    { roleId: 'member', allow: ['post_messages'], deny: ['post_messages'] }
  ]
}, 'post_messages');
assert.equal(allowed, false);

const canModerate = hasPermission({ roleIds: ['member', 'moderator'] }, 'mute_timeout_ban');
assert.equal(canModerate, true);

console.log('permissions checks passed');

~~~

## docs/communities/NOSTR_ARCHITECTURE.md
~~~md
# Sifaka Community Nostr Architecture

## Layering
- UI Layer: `communities/ui.js`
- State Layer: `communities/store.js`
- Permission Layer: `communities/permissions.js`
- Protocol Layer: `communities/nostr.js`
- Data Layer: relay events + local cache/mock data

## Nostr principles
- NIP-01 event model and relay transport are used for publish/subscribe.
- NIP-19 encode/decode helpers are provided via `window.NostrTools` when available.
- NIP-07 signer path is used when browser extension signer is present.
- NIP-05 identity display appears in profile popouts and message headers.

## Public vs Private spaces
- Public/discovery communities are modeled as NIP-72-like spaces (community-id tags and public channels).
- Private/closed groups are modeled as NIP-29-oriented groups with explicit permission policy and relay constraints.
- If relay support is partial, app falls back to hybrid tag conventions while preserving interoperability intent.

## Messaging
- Public channels use NIP-28 style kind 42 messages.
- Replies use NIP-10 style root/reply `e` tags.
- Reactions use kind 7 (NIP-25).
- Mentions and `nostr:` references are treated as URI-first text references (NIP-21/NIP-27 intent).

## Private messaging and encryption
- Product direction assumes NIP-17 + NIP-44 + NIP-59 gift-wrap style for private flows.
- Current implementation keeps this behind capability and fallback boundaries; deprecated NIP-04 is not used for new writes.

## Settings and lists
- User-level app behavior maps toward NIP-78 for app settings data.
- Saved community/channel/mute/favorites concepts map toward NIP-51 lists.

## Moderation and safety
- Report actions map toward NIP-56 flow.
- Sensitive content labels map toward NIP-36-style content-warning tags.

## Experimental features
- Feature flags exist for:
  - NIP-17 DM write path
  - NIP-29 private-group strict mode
  - NIP-53 live-room metadata
  - NIP-46 remote signer
  - NIP-50 search relay usage

~~~

## docs/communities/EVENT_KIND_TAG_MAPPING.md
~~~md
# Event Kind and Tag Mapping

## Channel messages
- Kind: `42` (public channel messaging style)
- Tags:
  - `h`: community identifier (`n72:*` or `n29:*`)
  - `t`: channel scope (`channel:<id>`)
  - `e`: reply/root references (NIP-10 conventions)
  - `alt`: fallback human-readable context

## Reactions
- Kind: `7`
- Tags:
  - `e`: target message id
  - `h`: community id
  - `t`: channel scope
- Content: reaction key (`+`, emoji shortcode, or custom emoji key)

## Moderation/reporting (planned mapping)
- Kind: NIP-56 report-compatible events
- Tags:
  - `p`: reported pubkey
  - `e`: reported event
  - reason/category tags

## Content warning / sensitive labels
- Tag: `content-warning` on message event (NIP-36 intent)

## Community and group metadata (hybrid)
- Public communities: NIP-72-oriented metadata and discovery indexing
- Private groups: NIP-29-oriented metadata and membership policy
- Channel abstraction:
  - category and permission state carried in app metadata and channel tags
  - interoperability preserved by tagging `h` + `t` even if clients ignore channel UI

## Attachments
- Attachment metadata can be carried in tags and/or referenced via URL metadata.
- NIP-94-style metadata support is intended for file descriptors.

~~~

## docs/communities/RELAY_STRATEGY.md
~~~md
# Relay Strategy

## Goals
- Fast startup
- Relay health visibility
- graceful failover
- dedup-ready architecture

## Relay sources
- Uses relay list from Sifaka app context when available.
- Fallback defaults are applied if context is unavailable.

## Connection behavior
- Maintains websocket connections per relay.
- Queue-based publish fallback if no relay is currently open.
- Relay status updates available for diagnostics/UI.

## Auth and access
- Supports future NIP-42/NIP-43 relay auth integration points.
- Private groups are expected to run on access-controlled relays.

## Compatibility
- If a relay lacks search capability, search remains local.
- If a relay lacks private-group support, app can continue with public-channel subset.

## Future enhancements
- NIP-65 relay list import and sync UX.
- NIP-66 relay health scoring and auto-routing.
- Batched subscriptions and explicit per-community relay pools.
- persisted relay telemetry for debugging.

~~~

## docs/communities/PERMISSIONS_MODEL.md
~~~md
# Permissions Model

## Role hierarchy
- owner
- admin
- moderator
- member
- guest

## Resolution order
1. Server defaults
2. Role grants/denies (stacked)
3. Channel role overrides
4. Channel user overrides
5. Explicit deny overrides allow
6. Owner bypass

## Supported permission keys
- view_channels
- post_messages
- reply_threads
- react
- attach_files
- edit_own_messages
- delete_own_messages
- delete_any_messages
- pin_messages
- invite_members
- approve_join_requests
- mute_timeout_ban
- manage_roles
- manage_channels
- manage_server
- manage_emoji
- create_live_rooms
- zap

## Implementation
- Core evaluator: `communities/permissions.js`
- Matrix helper for settings UI and audits: `buildPermissionMatrix()`

## Discord parity notes
- Channel-level explicit deny wins.
- Role stacking is additive with deny precedence.
- Owner role bypasses deny checks.

~~~

## docs/communities/TEST_PLAN.md
~~~md
# Communities Test Plan

## Unit tests
- Permission evaluator:
  - role stacking
  - deny precedence
  - owner bypass
  - channel overrides

## Integration tests
- Route and mount:
  - clicking Communities opens communities view
  - home/video/profile behavior remains intact
- Message send:
  - local optimistic append
  - reaction toggle
  - pin/unpin behavior
- Moderation actions:
  - mute/timeout/ban role checks
- Invite flow:
  - invite code generation and copy field update

## Protocol tests (manual + integration)
- NIP-07 signer available/unavailable
- Relay connected/disconnected publish behavior
- Tag shape for public channel message and reactions

## UX validation
- Desktop layout with all panes
- Mobile responsive behavior
- keyboard send (Enter) and multi-line (Shift+Enter)

## Regression checks
- Existing live stream, theater, profile navigation unaffected
- Existing settings/login flows unaffected

~~~

