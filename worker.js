console.log('worker');
importScripts('./hacbrewpack.js');

onmessage = (e) => {
    console.log('message', e);
    hacbrewpack().then((Module) => {
      const {
        argv,
        keys,
        controlNacp,
        main,
        mainNpdm,
        image,
        logo,
        startupMovie,
        nextArgv,
        nextNroPath,
      } = e.data;

      Module.FS.writeFile("/keys.dat", keys);

      Module.FS.mkdir("/control");
      Module.FS.writeFile("/control/control.nacp", controlNacp);

      if (image) {
        Module.FS.writeFile("/control/icon_AmericanEnglish.dat", image);
      }

      Module.FS.mkdir("/exefs");
      Module.FS.writeFile("/exefs/main", main);
      Module.FS.writeFile("/exefs/main.npdm", mainNpdm);

      Module.FS.mkdir("/logo");
      Module.FS.writeFile("/logo/NintendoLogo.png", logo);
      Module.FS.writeFile("/logo/StartupMovie.gif", startupMovie);

      Module.FS.mkdir("/romfs");
      Module.FS.writeFile("/romfs/nextArgv", nextArgv);
      Module.FS.writeFile("/romfs/nextNroPath", nextNroPath);

      console.log(Module.FS.readdir("/"));
      Module.callMain(argv);
    });
}