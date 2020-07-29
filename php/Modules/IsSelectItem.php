<?php

/**
 * Is select item
 */
class IsSelectItem
{
    public function Decide($itemType)
    {
        if (
            $itemType === 'S' || $itemType === 'SN' || $itemType === 'SO' || $itemType === 'SP'
        ) {
            return true;
        } else {
            return false;
        }
    }
}
