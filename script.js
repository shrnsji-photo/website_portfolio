const gallery = document.getElementById('gallery');
const repo = "shrnsji-photo/website_portfolio"; // your GitHub repo
const folder = "images";

// Fetch images dynamically from GitHub
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

// Download all as ZIP
document.getElementById('downloadAll').addEventListener('click', () => {
    window.location.href = `https://github.com/${repo}/archive/refs/heads/main.zip`;
});
