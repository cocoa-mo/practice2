//Webコンテンツデザイン演習 最終レポート
//GK7322 大畠 愛

window.onload = load_songle; //画面読み込み完了時のイベントハンドラ
window.onSongleWidgetReady = ready; //songleWidgetのイベントハンドラ
function load_songle() { //イベントハンドラ(load_songle)を定義
         var songleWidgetElement = //SongleWidget要素を作成
         SongleWidgetAPI.createSongleWidgetElement ({ //songleに関する設定
                 api: "songle-widget-api-example", //API属性に任意の文字列の設定
                 url: "www.youtube.com/watch?v=-EKxzId_Sj4"}); //楽曲のURL
         document.body.appendChild(songleWidgetElement); //DOM要素を追加
}
function ready(apiKey, songleWidget) { //イベントハンドラ(ready)を定義

         var scene = new THREE.Scene(); //シーンの作成
         var aspect = window.innerWidth / 400; //aspect比
         var camera = new THREE.PerspectiveCamera(80, aspect, 1, 1000); //camera
         camera.position.set(0, 0, 30); //カメラを設置

         //オブジェクトの追加
         var cuboid1Geo = new THREE.BoxGeometry(11, 5, 6); //直方体ジオメトリ
         var cuboid1Mat = new THREE.MeshToonMaterial({color:0XFFFFFF}); //Material
         var cuboid1 = new THREE.Mesh(cuboid1Geo, cuboid1Mat); //直方体メッシュの作成
         cuboid1.position.set(-10, 6, 13); //直方体を設置
         cuboid1.rotation.set(-Math.PI/5, 3, 0); //x軸周りに90度回転させる
         scene.add(cuboid1); //シーンに直方体を追加

         var cubeGeo = new THREE.BoxGeometry(12, 12, 12); //立方体ジオメトリ
         var cubeMat = new THREE.MeshToonMaterial({color:0XFFFFFF}); //Material
         var cube = new THREE.Mesh(cubeGeo, cubeMat); //立方体メッシュの作成
         cube.position.set(0, -9, 0); //立方体を設置
         cube.rotation.set(-Math.PI/3, 0, 2); //x軸周りに90度回転させる
         scene.add(cube); //シーンに立方体を追加

         var cuboid2Geo = new THREE.BoxGeometry(7, 12, 14); //直方体ジオメトリ
         var cuboid2Mat = new THREE.MeshToonMaterial({color:0XFFFFFF}); //Material
         var cuboid2 = new THREE.Mesh(cuboid2Geo, cuboid2Mat); //直方体メッシュの作成
         cuboid2.position.set(15, 4, 5); //直方体を設置
         cuboid2.rotation.set(-Math.PI/2, 0, 0); //x軸周りに90度回転させる
         scene.add(cuboid2); //シーンに直方体を追加

         //縦横の長さで形状を設定
         var planeGeometry = new THREE.PlaneGeometry(100, 60);
         //オブジェクトの材質（マテリアル）を設定
         var planeMaterial = new THREE.MeshPhongMaterial({color:0xCCCCCC});
         //メッシュの作成
         var plane = new THREE.Mesh(planeGeometry, planeMaterial);
         plane.rotation.set(-Math.PI/2, 0, 0); //x軸周りに90度回転させる
         plane.position.set(0, -27, 0); //平面の座標(x,y,z)を設定
         scene.add(plane); //シーンに平面を追加

         //光源（ライト）の設定と配置
         var light = new THREE.SpotLight(0xFFFFFF); //光源の種類,色の設定
         light.position.set(0, 30, 30); //光源の位置(x,y,z)
         scene.add(light); //シーンに光源を追加
         //ライトヘルパーを作成
         //var lightHelper = new THREE.SpotLightHelper(light);
         //scene.add(lightHelper);

         var renderer = new THREE.WebGLRenderer(); //レンダラーの作成
         renderer.setClearColor(new THREE.Color(0xEEEEEE)); //背景色の設定
         renderer.setSize(window.innerWidth, 400); //サイズを設定
         document.body.appendChild(renderer.domElement); //DOM要素を追加
         renderer.render(scene, camera); //シーンのレンダリング

         //カメラコントロールの定義
         var trckblCtrls = new THREE.TrackballControls(camera, renderer.domElement);
         trckblCtrls.rotateSpeed = 1.0; //カメラを回転させる速さの設定
         trckblCtrls.zoomSpeed = 1.0; //カメラをズームさせる速さの設定
         trckblCtrls.panSpeed = 1.0; //カメラをパンさせる速さの設定

         //レンダラーのDOM要素をbodyタグ内の子要素として追加する
         document.body.appendChild(renderer.domElement);
         renderer.render(scene, camera); //シーンのレンダリング

         var clock = new THREE.Clock(); //経過時間を取得するためのオブジェクト
         clock.start(); //時間の計測を開始

         function lightAnim() { //照明の動きに関する関数を定義
                //変数deltaに前回getDelta()が呼ばれたときからの時間を取得
                var delta = clock.getDelta();
                trckblCtrls.update(delta); //前回のupdateからのカメラの差分を更新

                //照明の位置への更新
                var t = clock.elapsedTime; //経過時間に応じて変化するパラメータtを設定
                var r = 30.0; //球体運動をする際の半径の設定
                var lightX = r*Math.cos(t); //x座標の算出
                var lightZ = r*Math.sin(t); //z座標の算出
                light.position.set(lightX, 5, lightZ); //照明の位置を変更
                light.lookAt(new THREE.Vector3(3, -5, 2)); //ライトを原点に向ける

                renderer.render(scene, camera); //シーンのレンダリング
                requestAnimationFrame(lightAnim); //animate関数を実行（２回目以降）
         } //lightAnim関数の終了

         //新たな拍になったイベント（”beatPaly”）に関するイベントリスナの設定
         songleWidget.on("beatPlay", function(event) {
                   if(event.beat.position===2){ //２拍目
                           console.log("2nd"); //コンソールで確認
                          document.body.className = "purple"; //bodyタグのclassを"purple"に
                   } else if(event.beat.position===4){ //４拍目
                          console.log("4th"); //コンソールで確認
                          document.body.className = "yellow"; //bodyタグのclassを"yellow"に
                   } //拍ごとのイベントに関するif文の終了
         }); //beatPlayに関するイベントリスナの終了

         var count; //変数countを定義
         var count = 0;

         //サビが始まったイベント（”chorusEnter”）に関するイベントリスナの設定
         songleWidget.on("chorusEnter", function(){
                console.log("chorus now"); //コンソールで確認
                //--サビの演出を記述---
                count ++; //サビの回数に応じて処理を分岐するためのcount変数を定義
                if (count === 1) { //１回目のサビ
                          function cubeAnim() { //アニメーションを実現するための関数を定義
                              //立方体をy軸周りに1°（π/180）だけ回転させる
                              cube.rotation.y = cube.rotation.y + Math.PI/180;
                              renderer.render(scene, camera); //シーンのレンダリング
                              requestAnimationFrame(cubeAnim); //cubeAnim関数を実行（２回目以降）
                          } //cubeAnim関数の終了
                          cubeAnim(); //cubeAnim関数を実際に実行する（１回目）
                          cube.material.color.setHex( 0X00FF7F ); //オブジェクトの色を変更
               } else if (count === 2) { //2回目のサビ
                          function cuboid1Anim() { //アニメーションを実現するための関数を定義
                              //方体をy軸周りに1°（π/180）だけ回転させる
                              cuboid1.rotation.y = cuboid1.rotation.y + Math.PI/180;
                              renderer.render(scene, camera); //シーンのレンダリング
                              requestAnimationFrame(cuboid1Anim); //cuboidAnim1関数を実行（２回目以降）
                          } //cuboid1Anim関数の終了
                          cuboid1Anim(); //cuboidAnim1関数を実際に実行する（１回目）
                          cuboid1.material.color.setHex( 0X00A5FF ); //オブジェクトの色を変更
               } else { //３回目以降のサビ
                          function cuboid2Anim() { //アニメーションを実現するための関数を定義
                              //方体をy軸周りに1°（π/180）だけ回転させる
                              cuboid2.rotation.y = cuboid2.rotation.y + Math.PI/180;
                              renderer.render(scene, camera); //シーンのレンダリング
                              requestAnimationFrame(cuboid2Anim); //cuboidAnim2関数を実行（２回目以降）
                          } //cuboid2Anim関数の終了
                          cuboid2Anim(); //cuboidAnim2関数を実際に実行する（１回目）
                          cuboid2.material.color.setHex( 0XDB7093 ); //オブジェクトの色を変更
                          lightAnim(); //lightAnim関数を実行
               } //chorusEnterに関するif文の終了
          }); //chorusEnterに関するイベントリスナの終了
} //関数readyの終了
