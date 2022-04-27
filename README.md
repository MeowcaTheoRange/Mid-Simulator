# Mid-Simulator
The main GitHub repository for JellyBean's Mid-Sim.

## How to Build:
  Game's built already. Just download the files, put it in a folder, open VS Code and start a Live Server.

## Documentation For Chartmaking
  [CHARTS.md](./CHARTS.md)

## Warnings 
  When downloading/playing an unofficially distributed mod of this game, be careful and look at [code/charts.js](./code/charts.js) for any bad code before you continue! Any `eval()`, popup, or other malicious code references should be a huge red flag!
  
  Some things to look for:
  
  `eval()`
  
  `window.close()`
  
  `fetch()`
  
  `alert()`
  
  `document.body.style.backgroundColor` (could cause a seizure for those who are photosensitive)
  
  `window.open()`
