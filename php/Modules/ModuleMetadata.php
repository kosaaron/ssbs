<?php

class ModuleMetadata
{
    static $userId;
    static $cTabId;
    static $cModuleId;

    public function setDefaultData($userId, $cTabId, $cModuleId)
    {
        ModuleMetadata::$userId = $userId;
        ModuleMetadata::$cTabId = $cTabId;
        ModuleMetadata::$cModuleId = $cModuleId;
    }
}
