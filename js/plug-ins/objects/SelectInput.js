/**
 * New module
 */
export default class SelectInput {
    /**
     * Integration
     */
    static Decide(inputType) {
        if (inputType === 'S'
            || inputType === 'SC'
            || inputType === 'SN'
            || inputType === 'SO'
            || inputType === 'SP'
        ) {
            return true;
        }
        return false;
    }
}