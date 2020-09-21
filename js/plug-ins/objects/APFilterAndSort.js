/**
 * Add plugin
 */
export default class APFilterAndSort {
    /**
     * Create
     * @param {String} fModulePluginFK 
     */
    static Create(fModulePluginFK, frameId) {
        let insertData = [],
            filter = {},
            order = {},
            className = 'InsertByParam',
            table = 't_107',
            c_title = 'c_66',
            v_title = 'Filter',
            c_fModulePluginFK = 'c_104_fk',
            v_fModulePluginFK = fModulePluginFK,
            c_fPluginPluginFK = 'c_108_fk',
            v_fPluginPluginFK = 'null',
            c_fCustomPluginFK = 'c_101_fk',
            v_fCustomPluginFK = 'null',
            c_number = 'c_67',
            v_number = '1';

        filter[table] = {};
        filter[table][c_title] = v_title;
        filter[table][c_fModulePluginFK] = v_fModulePluginFK;
        filter[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        filter[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        filter[table][c_number] = v_number;

        order[table] = {};
        order[table][c_title] = 'Order';
        order[table][c_fModulePluginFK] = v_fModulePluginFK;
        order[table][c_fPluginPluginFK] = v_fPluginPluginFK;
        order[table][c_fCustomPluginFK] = v_fCustomPluginFK;
        order[table][c_number] = '2';

        insertData[0] = filter;
        insertData[1] = order;

        console.log(insertData);

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
