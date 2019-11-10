# Vanguard Request Search

This mod lets you search for vanguard request by it's names so you don't have to scroll all the way down just to find a VG to teleport you to the dungeon entrance.

## How to install

 - Open the file called `protocol.353399.map` located in this repository, copy the content and paste it into your protocol map located in toolbox folder (`TOOLBOX ROOT/node_modules/tera-data/map/protocol.353399.map`);
 - Download the `module.json` and put it inside a folder with whatever name you want, proxy will auto-update and download all the files needed;
 - If you're not using toolbox, you got to move the def file from inside `defs` into (`.../node_modules/tera-data/protocol/`);

## Usage

Type `vgs name` to open the vanguard request window with all quests with that name.
E.g:
```javascript

/8 vgs hunt // This will list all vanguard requests with "hunt" in the name.

/8 vgs "antaroth's abyss" // This will list all vanguard requests which name matches "antaroth's abyss".

/8 vgs anta // This will also list all Antaroth's quests because it has "anta" in the name.
```

## Known issues

- You can't search when vanguard request window is open, so you need to close it before searching;

## Credits

- ITunk for the RU translations.