
// ---- MAIN ----

function DownloadBase() {
  window.location.href = "../direct-download?variant=base"
}

function UpdateBase() {
  window.location.href = "../direct-download?variant=update"
}

function Download(version) {
  if (navigator.userAgent.indexOf('Win') != -1) {
    if (version == 'base') {
      DownloadBase()
    } else {
      DroptopAlert(version)
    }
  } else {
		AgentAlert(version)
	}
}

function DroptopAlert(version) {
  Swal.fire({
    title: '<p class="download-alert-title" style="font-weight: 600; font-size: 2rem;">The basic version of Droptop must be installed first!</p>',
    html: '<p class="download-alert-text">Please download and install the basic version of Droptop before installing the supporter version or an update.</p>',
    icon: 'warning',
    imageWidth: 100,
    imageHeight: 100,
    background: '#181820',
    confirmButtonColor: '#5AB05B',
    confirmButtonText: 'I have it already',
    showDenyButton: true,
    denyButtonText: 'Get Basic Version',
    denyButtonColor: '#84858A',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      if (version == 'supporter') {
        window.open('https://cariboudjan.gumroad.com/l/droptop', '_blank')
        Swal.close()
      } else if (version == 'update') {
        UpdateBase()
        Swal.close()
      }
    } else if (result.isDenied) {
      DownloadBase()
      Swal.close()
    }        
  })
}

function AgentAlert(version) {
  Swal.fire({
    title: '<p class="agent-alert-title">Incompatible Device</p>',
    html: '<p class="agent-alert-text">Droptop Four only works on Windows devices. Download anyway?</p>',
    icon: 'warning',
    background: '#181820',
    confirmButtonColor: '#5AB05B',
    confirmButtonText: 'Download',
    showDenyButton: true,
    denyButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      if (version == 'base') {
        DownloadBase()
      } else {
        DroptopAlert(version)
      }
    }
  })
}


let mybutton = document.getElementById("scroll-to-top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


