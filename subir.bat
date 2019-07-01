cd C:\Users\NecaX\Documents\GitHub
rm -recurse -force choribotUsers
git clone https://NecaX@github.com/NecaX/choribotUsers
copy C:\Users\NecaX\Documents\GitHub\Choribot\conectados C:\Users\NecaX\Documents\GitHub\choribotUsers
cd choribotUsers
git add -u
git commit --no-edit
git pull
git push