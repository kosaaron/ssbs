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
            table = 't_107',
            c_title = 'c_66',
            v_title = 'Dinamic Popup',
            c_fModulePluginFK = 'c_104_fk',
            v_fModulePluginFK = fModulePluginFK,
            c_fPluginPluginFK = 'c_108_fk',
            v_fPluginPluginFK = 'null',
            c_fCustomPluginFK = 'c_101_fk',
            v_fCustomPluginFK = 'null',
            c_number = 'c_67',
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
