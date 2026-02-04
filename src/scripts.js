/* Made by DEV */

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

document.addEventListener("DOMContentLoaded", function() {
	// 1. Terminal Logic
	const lines = [
		"Initializing SOLOKNIGHT swapchain...",
		"Scanning for C++ modules",
		"Mapping kernel dependencies",
		"ImGui rendering engine: OK",
		"System security: Stealth active",
		"SOLOKNIGHT Environment Ready"
	];

	const term = document.getElementById("terminal");
	let lineIdx = 0;

	function typeTerminal() {
		if (lineIdx < lines.length) {
			term.innerHTML += `<span style="color: #6b7785;">[root@src]~</span> ${lines[lineIdx]}<br>`;
			term.scrollTop = term.scrollHeight;
			lineIdx++;
		}
	}
	setInterval(typeTerminal, 800);
	
	// Stat Counter Logic
	function counter(id, max, hasPlus) {
		let el = document.getElementById(id);
		if (!el) return;
		let n = 0;
		let duration = 20000;
		let stepTime = 15;
		let steps = duration / stepTime;
		let increment = max / steps;
		
		let t = setInterval(() => {
			n += increment;
			if (n >= max) {
				n = max;
				clearInterval(t);
				el.textContent = Math.floor(n).toLocaleString() + (hasPlus ? "+" : "");
			} else {
				el.textContent = Math.floor(n).toLocaleString();
			}
		}, stepTime);
	}

	counter("lines", 120000, true);
	counter("projectsCount", 42, true);
	counter("years", 2);

	var canvas = document.getElementById("logoCanvas");
	if (!canvas || typeof createjs === "undefined") return;

	var stage = new createjs.Stage(canvas);
	var img = document.createElement("img");
	img.crossOrigin = 'Anonymous';
	img.src = "https://cdn-images-1.medium.com/max/80/1*QNimSWsBQxta_xt3XksQaw@2x.png";
	img.onload = initParticles;

	var MAX_LOGOS = 120;
	var logos = [];
	var clicked = false;

	function initParticles() {
		handleResize();
		createjs.Ticker.on("tick", tick);
	   createjs.Ticker.framerate = 60;
	   createjs.Ticker.timingMode = createjs.Ticker.RAF;

	}

	function tick(event) {
	   if (event.paused) return;
		
		addLogo();
		var factor = 1,
			DIST = canvas.width / 10,
			ADD = 10;
		if (clicked) {
			factor = 5;
			DIST = canvas.width / 5;
		}

		for (var i = logos.length - 1; i >= 0; i--) {
			var b = logos[i];
			b.y += b.speed;
			b.rotation = (b.rotation + b.rotationSpeed) % 360;
			b.speed *= 1.05;

			b.x += b.addX;
			b.y += b.addY;
			b.addX *= 0.9;
			if (b.addY < 0) { b.addY *= 0.9; }

			var difX = stage.mouseX - b.x,
				difY = stage.mouseY - b.y,
				dist = Math.sqrt(difX * difX + difY * difY);
			if (Math.abs(dist) < DIST) {
				if (clicked) { b.rotationSpeed *= -difX / DIST * 10; }
				b.addX = -difX / DIST * ADD * (b.scale) * factor;
				b.addY = -difY / DIST * ADD * (b.scale) * factor;
			}

			if (b.y > canvas.height + 30) {
				resetLogo(b);
			}
		}
		clicked = false;
		stage.update(event);
	}

	function addLogo() {
	if (logos.length >= MAX_LOGOS) return;
	
	var b = new createjs.Bitmap(img);
	b.regX = 40;
	b.regY = 40;

	// Get the current theme color values
	const theme = getGlowRGB();
	
	b.pulseTimer = Math.random() * Math.PI * 2; 

	b.filters = [
		new createjs.ColorFilter(0, 0, 0, 1, theme.r, theme.g, theme.b, 0)
	];

	b.shadow = new createjs.Shadow(theme.hex, 0, 0, 15);

	b.cache(0, 0, 80, 80);

	stage.addChild(b);
	logos.push(b);
	resetLogo(b);
}


function resetLogo(b) {
	b.x = Math.random() * canvas.width;
	b.y = -60;
	b.speed = Math.random() * 3 + 1.5;
	b.rotationSpeed = Math.random() * 2 - 1;
	b.scale = b.speed / 10;
	b.addX = 0;
	b.addY = 0;

	b.alpha = Math.random() * 0.5 + 0.5;
}

function getGlowRGB() {
	// This reads the actual value of --logoglow from your :root var(--logoglow)
	const color = getComputedStyle(document.documentElement).getPropertyValue('--logoglow').trim();
	
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);
	
	return { r, g, b, hex: color };
	
}

function tick(event) {
	if (logos.length < MAX_LOGOS) { addLogo(); }

	for (var i = logos.length - 1; i >= 0; i--) {
		var b = logos[i];
		b.y += b.speed;
		b.rotation += b.rotationSpeed;

		b.pulseTimer += 0.05;
		var pulse = Math.sin(b.pulseTimer);
		
		b.scale = (b.speed / 10) + (pulse * 0.05); 
		b.alpha = 0.3 + (pulse * 0.2); 
		
		if (Math.random() > 0.98) b.alpha = 0.1;

		if (b.y > canvas.height + 50) { resetLogo(b); }
	}
	stage.update(event);
}

	function handleResize() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		stage.update();
	}

	window.addEventListener("resize", handleResize);
	stage.on("stagemousedown", function () {
		clicked = true;
	});
});

setTimeout(() => {
	alert("IF YOU HAVE QUESTIONS BE SURE TO CLICK THE DISCORD LINK IN CONTACTS ⬇️ 🔗");
	alert("IM STILL LEARNING SO BARE WITH ME🙏");
	alert("EVERYDAY IS A NEW DAY TO LEARN SOMETHING NEW‼️");
}, 1000);