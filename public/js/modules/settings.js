const Settings = {
    // this param will be changed after page load
    me: {
        showmenu: 0,
        showviewer: 0,
        smilesclose: 0,
        uppercase: 0,
        ambientSound: 0,
        goldSound: 0,
        caseSound: 0,
        theme: 0
    },

    
    update(option, value, cb) {
        $.post(`/api/settings/${option}`, {value: value}, (res) => {
            if(res.success){
                $('#settings_'+option).parent().addClass("saved");
                setTimeout(() => {
                    $('#settings_'+option).parent().removeClass("saved");
                }, 1000);
                if(option == 'ambientSound'){
                    if(value == '1') {
                        sounds.ambientSound.src = '../assets/ambient_garage.mp3';
                        sounds.ambientSound.play();
                    }
                    else sounds.ambientSound.pause();
                }

                if(cb) cb(res);
            }
        });
    },

    checkbox(){
        let items = `#settings_showmenu,
                      #settings_showviewer,
                      #settings_smilesclose,
                      #settings_uppercase,
                      #settings_ambientSound,
                      #settings_goldSound,
                      #settings_caseSound
                    `;

        $(items).change(function() {
            let option = $(this).attr('id').replace('settings_', '');
            let val = $(this).is(":checked") ? 1 : 0;
            Settings.update(option, val);
            ME.settings[option] = val;
        });
    },

    theme(v){
        let val = ME.settings.theme || 0;
        if(v) val = v;
        $("#theme-select").val(val);
        if(val == 0) val = '';
        else if(val == 1) val = 'green';
        else if(val == 2) val = 'teal';
        else if(val == 3) val = 'darkblue';
        else if(val == 4) val = 'dark';
        $("body").removeClass("green teal darkblue dark").addClass(val);
    }
}
Settings.checkbox();
$(".select-item").click(function(){
    $(".select-item").toggleClass("open");
})
$("#settings-nav a").click(function(){
    let id = $(this).attr('data-id');
    $("#settings-nav a").removeClass("active");
    $(this).addClass("active");
    $("#settings-game, #settings-interface, #settings-account, #settings-others").addClass("hidden");
    $("#settings-"+id).removeClass("hidden");
});
$("#theme-select").on("change", function(){
    let val = $(this).val();
    Settings.update('theme', val);
    Settings.theme(val);
});
Settings.theme();