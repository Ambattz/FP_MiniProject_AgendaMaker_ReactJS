cd ReactJS
rm calculate-score.js
npm install
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
echo "React installation is done"
