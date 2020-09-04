/**
 * Add plugin
 */
export default class APDinamicPopup {
    /**
     * Create
     * @param {String} fModulePluginFK 
     */
    static Create(fModulePluginFK, frameId) {
        let insertData = [],
            popup = {},
            className = 'InsertByParam',
            table = 'f_plugin_form_inputs',
            c_title = 'Title',
            v_title = 'Dinamic Popup',
            c_fModulePluginFK = 'FModulePluginFK',
            v_fModulePluginFK = fModulePluginFK,
            c_fPluginPluginFK = 'FPluginPluginFK',
            v_fPluginPluginFK = 'null',
            c_fCustomPluginFK = 'FCustomPluginFK',
            v_fCustomPluginFK = 'null',
            c_number = 'Number',
            v_number = '1';

        popup[table] = {};
        popup[table][c_title] = v_title;
        popup[table][c_fModulePluginFK] = v_fModulePluginFK;
        popup[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        popup[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        popup[table][c_number] = v_number;

        insertData[0] = popup;

        $.ajax({
            type: "POST",
            url: "./php/Router.php",
            data: { 'Module': className, 'Data': insertData },
            success: function (result) {
                $(`#${frameId}`).trigger(`${frameId}_save_end`);
            },
            dataType: 'json'
        });
    }
}
