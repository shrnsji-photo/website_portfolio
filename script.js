const gallery = document.getElementById('gallery');
const repo = "YOUR_USERNAME/YOUR_REPO"; // replace with your GitHub username and repo
const folder = "images"; // folder with photos

fetch(`https://api.github.com/repos/${repo}/contents/${folder}`)
.then(res => res.json())
.then(data => {
    data.forEach(file => {
        const frame = document.createElement('div');
        frame.className = 'photo-frame';
        
        const img = document.createElement('img');
        img.src = file.download_url;
        img.alt = file.name;
        img.onclick = () => window.open(file.download_url,'_blank');
        
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
