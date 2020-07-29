<?php

/**
 * Item from tree
 */
class ItemFromTree
{
    public function Find($tree, $itemId)
    {
        if (array_key_exists($itemId, $tree)) {
            return $tree[$itemId];
        } else {
            foreach ($tree as $value) {
                if (is_array($value)) {
                    $result = $this->Find($value, $itemId);
                    if (!is_null($result)) {
                        return $result;
                    }
                }
            }
        }

        return null;
    }
}
