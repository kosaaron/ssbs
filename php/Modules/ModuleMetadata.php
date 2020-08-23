<?php

class ModuleMetadata
{
    static $userId;
    static $cModuleId;
    static $fUserModuleId;
    static $uplodedData;
    static $mainTable;
    static $disableFormFill;

    public function setDefaultData($userId, $cModuleId, $fUserModuleId)
    {
        ModuleMetadata::$userId = $userId;
        ModuleMetadata::$cModuleId = $cModuleId;
        ModuleMetadata::$fUserModuleId = $fUserModuleId;
    }

    public function setUplodedData($uplodedData)
    {
        ModuleMetadata::$uplodedData = $uplodedData;
    }
}
