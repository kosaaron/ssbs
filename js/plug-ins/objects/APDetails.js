/**
 * Add plugin
 */
export default class APDetails {
    /**
     * Create
     * @param {String} fModulePluginFK 
     */
    static Create(fModulePluginFK, frameId) {
        let insertData = [],
            display1 = {},
            display2 = {},
            className = 'InsertByParam',
            //Card data
            table = 't_106',
            c_title = 'c_64',
            v_title = 'Display',
            c_fModulePluginFK = 'c_104_fk',
            v_fModulePluginFK = fModulePluginFK,
            c_fPluginPluginFK = 'c_108_fk',
            v_fPluginPluginFK = 'null',
            c_fCustomPluginFK = 'c_101_fk',
            v_fCustomPluginFK = 'null',
            c_number = 'c_65',
            v_number = '1';

        /** Display */
        // Display data 1
        display1[table] = {};
        display1[table][c_title] = v_title;
        display1[table][c_fModulePluginFK] = v_fModulePluginFK;
        display1[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        display1[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        display1[table][c_number] = v_number;

        // Display data 2
        v_number = '2';

        display2[table] = {};
        display2[table][c_title] = v_title;
        display2[table][c_fModulePluginFK] = v_fModulePluginFK;
        display2[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        display2[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        display2[table][c_number] = v_number;

        insertData[0] = display1;
        insertData[1] = display2;

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
