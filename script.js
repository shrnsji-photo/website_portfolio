const gallery = document.getElementById('gallery');
const repo = "shrnsji-photo/website_portfolio"; // GitHub username/repo
const folder = "images";

// Load images dynamically
fetch(`https://api.github.com/repos/${repo}/contents/${folder}`)
.then(res => res.json())
.then(data => {
    data.filter(file => file.type === "file" && /\.(jpg|jpeg|png|gif)$/i.test(file.name))
    .forEach(file => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        
        const img = document.createElement('img');
        img.src = file.download_url;
        img.alt = file.name;
        
        const actions = document.createElement('div');
        actions.className = 'actions';
        
        const previewBtn = document.createElement('button');
        previewBtn.innerText = "Preview";
        previewBtn.onclick = () => window.open(file.download_url,'_blank');
        
        const downloadBtn = document.createElement('button');
        downloadBtn.innerText = "Download";
        downloadBtn.onclick = () => {
            const link = document.createElement('a');
            link.href = file.download_url;
            link.download = file.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        
        actions.appendChild(previewBtn);
        actions.appendChild(downloadBtn);
        frame.appendChild(img);
        frame.appendChild(actions);
        gallery.appendChild(frame);
    });
});

// Download all images
document.getElementById('downloadAll').addEventListener('click', () => {
    window.location.href = `https://github.com/${repo}/archive/refs/heads/main.zip`;
});

// Particles animation
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particles = [];

for(let i=0;i<60;i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*2+1,
        dx: (Math.random()-0.5)*0.5,
        dy: (Math.random()-0.5)*0.5,
        color: `rgba(255,191,74,${Math.random()})`
    });
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.x+=p.dx; p.y+=p.dy;
        if(p.x<0 || p.x>canvas.width) p.dx*=-1;
        if(p.y<0 || p.y>canvas.height) p.dy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color;
        ctx.fill();
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
