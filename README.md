# Yii2 Gulp Sass Bootstrap
## How to install
Copy files into the yii2 root folder.

Run:
`npm install`

Turn off Yii2 Asset Manager in config:
```php
$config = [
     // ...
     'components' => [
         // ...
         'assetManager' => [
             'bundles' => false,
         ],
     ],
 ];
 ```
 
 Or in desired (usually front-end) Module:
 ```php
public function init() {
    Yii::$app->assetManager->bundles = false;
    
    parent::init();
}
   ```
   
   Edit layout file `views/layouts/main.php`. After `<?= Html::csrfMetaTags() ?>` add:
   
   ```php
   <?= Html::cssFile('@web/css/all.css?v=' . filemtime(Yii::getAlias('@webroot/css/all.css'))) ?>
   ```
   
   Right before `<?php $this->endBody() ?>`  add:
   ```php
   <?= Html::jsFile('@web/js/all.js?v=' . filemtime(Yii::getAlias('@webroot/js/all.js'))) ?>
   ```
   
   ## How to use
   Run `gulp` from the Yii2 root folder.
