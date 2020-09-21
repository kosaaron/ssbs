/**
 * Add plugin
 */
export default class APCardBox {
    /**
     * Create
     * @param {String} fModulePluginFK 
     */
    static Create(fModulePluginFK, frameId) {
        let insertData = [],
            card = {},
            display = {},
            className = 'InsertByParam',
            //Card data
            table = 't_105',
            c_fModulePluginFK = 'c_104_fk',
            v_fModulePluginFK = fModulePluginFK,
            c_fPluginPluginFK = 'c_108_fk',
            v_fPluginPluginFK = 'null',
            c_fCustomPluginFK = 'c_101_fk',
            v_fCustomPluginFK = 'null',
            c_number = 'c_63',
            v_number = '1';

        /** Card */
        card[table] = {};
        card[table][c_fModulePluginFK] = v_fModulePluginFK;
        card[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        card[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        card[table][c_number] = v_number;

        /** Display */
        // Display data
        let c_title = 'Title',
            v_title = 'Display';
        table = 't_106';

        display[table] = {};
        display[table][c_title] = v_title;
        display[table][c_fModulePluginFK] = v_fModulePluginFK;
        display[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        display[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        display[table][c_number] = v_number;

        insertData[0] = card;
        insertData[1] = display;

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
