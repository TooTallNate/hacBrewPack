let message;
let preRunCalled = false;

onmessage = function(event) {
    console.log('onmessage')
    message = event;
    if (preRunCalled) {
        setupFS();
        Module.removeRunDependency('payload');
    }
};

Module.preRun = () => {
    console.log('preRun')
    preRunCalled = true;
    if (message) {
        setupFS();
    } else {
        Module.addRunDependency('payload');
    }
}

function setupFS() {
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
    } = message.data;

    FS.writeFile('/keys.dat', keys);

    FS.mkdir('/control');
    FS.writeFile('/control/control.nacp', controlNacp);

    if (image) {
      FS.writeFile('/control/icon_AmericanEnglish.dat', image);
    }

    FS.mkdir('/exefs');
    FS.writeFile('/exefs/main', main);
    FS.writeFile('/exefs/main.npdm', mainNpdm);

    FS.mkdir('/logo');
    FS.writeFile('/logo/NintendoLogo.png', logo);
    FS.writeFile('/logo/StartupMovie.gif', startupMovie);

    FS.mkdir('/romfs');
    FS.writeFile('/romfs/nextArgv', nextArgv);
    FS.writeFile('/romfs/nextNroPath', nextNroPath);

    Module.arguments = argv || [];
}

Module.postRun = () => {
  const nspName = FS.readdir('/hacbrewpack_nsp').filter(n => n.endsWith('.nsp'))[0];

  let nsp
  if (nspName) {
    nsp = FS.readFile(`/hacbrewpack_nsp/${nspName}`)
  }

  postMessage({
    exitCode: EXITSTATUS,
    nsp,
    // TODO: pass logs
  })
}