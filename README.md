# 接口文档

## 目录：

	1). 登陆
	2). 添加用户
	3). 更新用户
	4). 获取所有用户列表
	5). 删除用户
	6). 获取一级或某个二级分类列表
	7). 添加分类
	8). 更新品类名称
	9). 根据分类ID获取分类
	10). 获取商品分页列表
	11). 根据ID/Name搜索产品分页列表
	12). 添加商品
	13). 更新商品
	14). 对商品进行上架/下架处理
	15). 上传图片
	16). 删除图片
	17). 添加角色
	18). 获取角色列表
	19). 更新角色(给角色设置权限)
	20). 获取天气信息(支持jsonp)

## 1. 登陆

### 请求URL：

	http://localhost:5000/login

### 请求方式：

	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码

### 返回示例：

	成功:
	  {
	    "status": 0,
	    "data": {
	      "_id": "5c3b297dea95883f340178b0",
	      "password": "21232f297a57a5a743894a0e4a801fc3",
	      "username": "admin",
	      "create_time": 1547381117891,
	      "__v": 0,
	      "role": {
	        "menus": []
	      }
	    }
	  }
	失败
	  {
	    "status": 1,
	    "msg": "用户名或密码不正确!"
	  }

## 2. 添加用户

### 请求URL：

	http://localhost:5000/manage/user/add

### 请求方式：

	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|username    |Y       |string   |用户名
	|password    |Y       |string   |密码
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱
	|role_id     |N       |string   |角色ID

### 返回示例：

	成功:
	  {
	    "status": 0,
	    "data": {
	      "_id": "5c3b382c82a14446f4ffb647",
	      "username": "admin6",
	      "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
	      "phone": "13712341234",
	      "email": "test@qq.com",
	      "create_time": 1547384876804,
	      "__v": 0
	    }
	  }
	失败
	  {
	    "status": 1,
	    "msg": "此用户已存在"
	  }

## 3. 更新用户

### 请求URL：

	http://localhost:5000/manage/user/update

### 请求方式：

	POST

### 参数类型

	|参数		|是否必选 |类型     |说明
	|_id         |Y       |string   |ID
	|username    |N       |string   |用户名
	|phone       |N       |string   |手机号
	|email       |N       |string   |邮箱
	|role_id     |N       |string   |角色ID

### 返回示例：

	成功:
	  {
	    "status": 0,
	    "data": {
	      "_id": "5c3b382c82a14446f4ffb647",
	      "username": "admin6",
	      "password": "d7b79bb6d6f77e6cbb5df2d0d2478361",
	      "phone": "13712341234",
	      "email": "test@qq.com",
	      "create_time": 1547384876804,
	      "__v": 0
	    }
	  }
	失败
	  {
	    "status": 1,
	    "msg": "此用户已存在"
	  }

## 4. 获取所有用户列表

### 请求URL：

	http://localhost:5000/manage/user/list

### 请求方式：

	GET

### 参数类型: 

	无

### 返回示例：

    {
      "status": 0,
      "data": {
        "users": [
          {
            "_id": "5cb05b4db6ed8c44f42c9af2",
            "username": "test",
            "password": "202cb962ac59075b964b07152d234b70",
            "phone": "123412342134",
            "email": "sd",
            "role_id": "5ca9eab0b49ef916541160d4",
            "create_time": 1555061581734,
            "__v": 0
          },
          {
            "_id": "5cb05b69b6ed8c44f42c9af3",
            "username": "ss22",
            "password": "123",
            "phone": "23343",
            "email": "df",
            "role_id": "5caf5444c61376319cef80a8",
            "create_time": 1555061609666,
            "__v": 0
          }
        ],
        "roles": [
          {
            "menus": [
              "/home",
              "/role",
              "/category",
              "/products",
              "/product",
              "/charts/bar"
            ],
            "_id": "5ca9eaa1b49ef916541160d3",
            "name": "测试",
            "create_time": 1554639521749,
            "__v": 0,
            "auth_time": 1555145863489,
            "auth_name": "admin"
          }
        ]
      }
    }

## 5. 删除用户

### 请求URL：

	http://localhost:5000/manage/user/delete

### 请求方式：

	POST

### 参数类型:

	|参数		|是否必选 |类型     |说明
	|userId     |Y       |string   |用户ID

### 返回示例：

	{
	  "status": 0
	}

## 6. 获取一级或某个二级分类列表

### 请求URL：

	http://localhost:5000/manage/category/list

### 请求方式：

	GET

### 参数类型: query

	|参数		|是否必选 |类型     |说明
	|parentId    |Y       |string   |父级分类的ID

### 返回示例：

    一级分类:
      {
        "status": 0,
        "data": [
          {
            "parentId": "0",
            "_id": "5c2ed631f352726338607046",
            "name": "分类001",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed647f352726338607047",
            "name": "分类2",
            "__v": 0
          },
          {
            "parentId": "0",
            "_id": "5c2ed64cf352726338607048",
            "name": "1分类3",
            "__v": 0
          }
        ]
      }
    二级分类
      {
        "status": 0,
        "data": [
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed65df352726338607049",
            "name": "分类3333",
            "__v": 0
          },
          {
            "parentId": "5c2ed64cf352726338607048",
            "_id": "5c2ed66ff35272633860704a",
            "name": "分类34",
            "__v": 0
          }
        ]
      }


​      

## 7. 添加分类

### 请求URL：

    http://localhost:5000/manage/category/add

### 请求方式：

    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |parentId      |Y       |string   |父级分类的ID
    |categoryName  |Y       |string   |名称
    |price  |N       |Number   |价格

### 返回示例：

    添加一级分类:
       {
       "status":0,
       "data":{
       "parentId":"0",
       "price":0,"_id":"5ec0ed151e44cf4a3c83483f",
       "name":"铲雪",
       "__v":0
       	}
       }
    添加二级分类
      {
      "status":0,
      "data":{
      "parentId":"5ec0ed151e44cf4a3c83483f",
      "price":400,
      "_id":"5ec0ed6a1e44cf4a3c834840",
      "name":"个人铲雪","__v":0
      	}
      }


## 8. 更新品类名称

### 请求URL：

    http://localhost:5000/manage/category/update

### 请求方式：

    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |categoryId    |Y       |string   |父级分类的ID
    |categoryName  |Y       |string   |名称
    |price  |N       |Number   |价格

### 返回示例：

    {
      "status": 0
    }


## 9. 根据分类ID获取分类

### 请求URL：//没啥用

    http://localhost:5000/manage/category/info

### 请求方式：

    GET

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |categoryId    |Y       |string   |父级分类的ID

### 返回示例：

    {
      "status": 0,
      "data": {
        "parentId": "0",
        "_id": "5c2ed631f352726338607046",
        "name": "分类001",
        "__v": 0
      }
    }


## 10. 获取服务申请分页列表

### 请求URL：

    http://localhost:5000/manage/wo/all

### 请求方式：

    GET

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |pageNum    |Y       |Number   |页码
    |pageSize   |Y       |Number   |每页条目数
    |userId   |Y       |string   |用户Id

### 返回示例：

    {
      "status":0,
      "data":{
      "pageNum":1,
      "total":11,
      "pages":4,"
      pageSize":3,
      "list":[
    	{
    	  "status":4,
    	  "imgs": [],
    	  "serviceStaffId":"",
    	  "_id":"5eb29a3db9829e55444f4232",
    	  "woId":"868339",
    	  "userId":"5e7abb8e29f18c2f683b2572",
      	  "createDate":1588849574175,
    	  "serviceName":"搬运\\个人搬家",
    	  "deadline":1589540774175,
     	  "parentId":"5e8a8f4fe062ff3724227616",
    	  "selfId":"5e8aecc142a417101814b752",
    	  "cost":100,
    	  "detail":"<h1>hhh</h1>\n<h1>;'';'''</h1>\n","address":"湖南省长沙市天心区","__v":0
    	  },	   	
    	  {
          "status":4,
    	  "imgs":[],
    	  "serviceStaffId":null,
      	  "_id":"5eb2ab0cb9829e55444f4233",
    	  "woId":"225026",
    	  "userId":"5e7abb8e29f18c2f683b2572",
    	  "createDate":1589458693174,
      	  "serviceName":"搬运\\个人搬家",
    	  "deadline":1590149893174,
    	  "parentId":"5e8a8f4fe062ff3724227616",
    	  "selfId":"5e8aecc142a417101814b752",
    	  "cost":100,
    	  "detail":"<p></p>\n",
    	  "address":"湖南省长沙市天心区",
    	  "__v":0
    	},
    	{
    	  "status":4,
    	  "imgs":["image-1588852178344.jpg"],
    	  "serviceStaffId":"",
    	  "_id":"5eb3f5de074ae66b68606dd2",
    	  "woId":"972168",
    	  "userId":"5eb3f50e074ae66b68606dd1",
    	  "createDate":1589543363597,
    	  "serviceName":"室外\\草地修建",
    	  "deadline":1590234563597,
    	  "parentId":"5e8a8f5de062ff3724227617",
    	  "selfId":"5e8aed2d42a417101814b753",
    	  "cost":120,
    	  "detail":"<p>呜啦啦啦</p>\n",
    	  "address":"湖南省长沙市天心区","__v":0}
    	]
      }
    }

## 11. 根据WoId/desc搜索服务申请分页列表

### 请求URL：

    http://localhost:5000/manage/wo/search?pageNum=1&pageSize=3&woId=87

### 请求方式：

    GET

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |pageNum       |Y       |Number   |页码
    |pageSize      |Y       |Number   |每页条目数
    |woId   |N       |String   |根据woId搜索
    |woDesc   |N       |String   |根据wo描述搜索

### 返回示例：

    {
      "status":0,
      "data":{"pageNum":1,
      "total":1,
      "pages":1,
      "pageSize":3,
      "list":[
    	{
    	  "status":4,
    	  "imgs":[],
    	  "serviceStaffId":"",
    	  "_id":"5eb29a3db9829e55444f4232",
    	  "woId":"868339",
    	  "userId":"5e7abb8e29f18c2f683b2572",
    	  "createDate":1588849574175,
    	  "serviceName":"搬运\\个人搬家",
    	  deadline":1589540774175,
    	  "parentId":"5e8a8f4fe062ff3724227616",
    	  "selfId":"5e8aecc142a417101814b752",
    	  "cost":100,
    	  "detail":"<h1>hhh</h1>\n<h1>;'';'''</h1>\n",
    	  "address":"湖南省长沙市天心区",
    	  "__v":0
    	  }
    	 ]
      }
    }

## 12. 添加订单

### 请求URL：

    http://localhost:5000/manage/product/add

### 请求方式：

    POST

### 参数类型:

    |参数	      |是否必选 |类型     |说明
    |woId      |Y       |string   |订单ID
    |userId    |Y       |string   |订单申请用户ID
    |createDate    |Y       |Number   |订单创建时间
    |serviceName   |Y       |string   |订单类型
    |deadline      |Y       |Number   |订单截至时间
    |parentId      |Y       |string   |一级分类Id
    |selfId        |Y       |string   |二级分类Id
    |cost          |Y       |Number   |订单价格
    |imgs          |N       |array   |商品图片名数组
    |detail        |N       |string   |订单细节
    |address       |Y       |string   |订单地址

### 返回示例：

    {
      "status":0,
      "data":
    	{
    	  "status":0,
    	  "imgs":["image-1589705345889.jpeg"],
    	  "serviceStaffId":"",
    	  "_id":"5ec0fa8c1e44cf4a3c834841",
    	  "woId":"916651",
    	  "userId":"5e7abb8e29f18c2f683b2572",
    	  "createDate":1589791736920,
    	  "serviceName":"搬运\\个人搬家",
    	  "deadline":1590050936920,
    	  "parentId":"5e8a8f4fe062ff3724227616",
    	  "selfId":"5e8aecc142a417101814b752",
    	  "cost":100,
    	  "detail":"<p>3456788</p>\n",
    	  "address":"湖南省长沙市天心区",
    	  "__v":0
    	}
    }

## 13. 更新订单状态

### 请求URL：

    http://localhost:5000/manage/wo/updateStatus

### 请求方式：

    POST

### 参数类型:

    |参数		       |是否必选 |类型     |说明
    |woId           |Y       |string   |订单ID
    |status         |Y       |string   |订单变化状态
    |serviceStaffId |N       |string   |接单人Id

### 返回示例：

    {
      "status": 0
    }

## 14. 对商品进行上架/下架处理   //没有使用

### 请求URL：

    http://localhost:5000/manage/product/updateStatus

### 请求方式：

    POST

### 参数类型:

    |参数		      |是否必选 |类型     |说明
    |productId    |Y       |string   |商品名称
    |status       |Y       |number   |商品状态值

### 返回示例：

    {
      "status": 0
    }

## 15. 上传图片 

### 请求URL：

    http://localhost:5000/manage/img/upload

### 请求方式：

    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |image  |Y       |文件   |图片文件

### 返回示例：

    {
        "status": 0,
        "data": {
            "name": "image-1559466841118.jpg",
            "url": "http://localhost:5000/upload/image-1559466841118.jpg"
        }
    }

## 16. 删除图片

### 请求URL：

    http://localhost:5000/manage/img/delete

### 请求方式：

    POST

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |name    |Y       |string   |图片文件名

### 返回示例：

    {
      "status": 0
    }

## 17. 添加角色

### 请求URL：

    http://localhost:5000/manage/role/add

### 请求方式：

    POST

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |roleName    |Y       |string   |角色名称

### 返回示例：

    {
        "status": 0,
        "data": {
            "menus": [],
            "_id": "5cf39a319929a304dcc0c6ec",
            "name": "角色x",
            "create_time": 1559468593702,
            "__v": 0
        }
    }

## 18. 获取角色列表

### 请求URL：

    http://localhost:5000/manage/role/list

### 请求方式：

    GET

### 参数类型: 

    无

### 返回示例：

    {
        "status": 0,
        "data": [
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "5ca9eaa1b49ef916541160d3",
                "name": "测试",
                "create_time": 1554639521749,
                "__v": 0,
                "auth_time": 1558679920395,
                "auth_name": "test007"
            },
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/charts/line",
                    "/category",
                    "/product",
                    "/products"
                ],
                "_id": "5ca9eab0b49ef916541160d4",
                "name": "经理",
                "create_time": 1554639536419,
                "__v": 0,
                "auth_time": 1558506990798,
                "auth_name": "test008"
            },
            {
                "menus": [
                    "/home",
                    "/products",
                    "/category",
                    "/product",
                    "/role"
                ],
                "_id": "5ca9eac0b49ef916541160d5",
                "name": "角色1",
                "create_time": 1554639552758,
                "__v": 0,
                "auth_time": 1557630307021,
                "auth_name": "admin"
            }
        ]
    }

## 19. 更新角色(给角色设置权限)

### 请求URL：

    http://localhost:5000/manage/role/update

### 请求方式：

    POST

### 参数类型:

    |参数		     |是否必选  |类型     |说明
    |_id          |Y       |string   |角色ID
    |menus        |Y       |array    |权限key数组
    |auth_time    |Y       |number   |权限时间
    |auth_name    |Y       |string   |权限人姓名

### 返回示例：

    {
        "status": 0,
        "data": {
            "menus": [
                "/role",
                "/charts/bar",
                "/home",
                "/category",
                "/user"
            ],
            "_id": "5ca9eaa1b49ef916541160d3",
            "name": "测试",
            "create_time": 1554639521749,
            "__v": 0,
            "auth_time": 1559469116470,
            "auth_name": "admin"
        }
    }

## 20. 获取天气信息(支持jsonp)

### 请求URL：

    http://api.seniverse.com/v3/weather/now.json

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |UID           |Y       |string   |私钥
    |KEY           |Y       |string   |公钥
    |LOCATION      |Y       |string   |城市名

### 返回示例：

    __jp1(
      {"results":
    	[{"location":{"id":"WT029G15ETRJ",
    	"name":"长沙",
    	"country":"CN",
    	"path":"长沙,长沙,湖南,中国",
    	"timezone":"Asia/Shanghai",
    	"timezone_offset":"+08:00"},
    	"now":{"text":"多云","code":"4","temperature":"29"},
    	"last_update":"2020-05-17T17:40:00+08:00"}]
    });

## 21. 删除订单

### 请求URL：

    http://localhost:5000/manage/wo/delete

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |WoId           |Y       |string   |订单唯一Id

### 返回示例：

    {"status":0}

## 22. 根据订单ID获取订单全部信息

### 请求URL：

    http://localhost:5000/manage/wo/one

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |WoId           |Y       |string   |订单Id

### 返回示例：

    {
      "status":0,
      "data":{
      "status":4,
      "imgs":[],
      "serviceStaffId":null,
      "_id":"5eb2ab0cb9829e55444f4233",
      "woId":"225026",
      "userId":"5e7abb8e29f18c2f683b2572",
      "createDate":1589458693174,
      "serviceName":"搬运\\个人搬家",
      "deadline":1590149893174,
      "parentId":"5e8a8f4fe062ff3724227616",
      "selfId":"5e8aecc142a417101814b752",
      "cost":100,
      "detail":"<p></p>\n",
      "address":"湖南省长沙市天心区",
      "__v":0
        }
    }

## 23. 获取接单广场里面的订单信息

### 请求URL：

    http://localhost:5000/manage/wo/serviceWo

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |pageNum       |Y       |Number   |页码
    |pageSize      |Y       |Number   |每页条目数

### 返回示例：

    {
      "status":0,
      "data":{
      "status":1,
      "imgs":[],
      "serviceStaffId":null,
      "_id":"5eb2ab0cb9829e55444f4233",
      "woId":"225026",
      "userId":"5e7abb8e29f18c2f683b2572",
      "createDate":1589458693174,
      "serviceName":"搬运\\个人搬家",
      "deadline":1590149893174,
      "parentId":"5e8a8f4fe062ff3724227616",
      "selfId":"5e8aecc142a417101814b752",
      "cost":100,
      "detail":"<p></p>\n",
      "address":"湖南省长沙市天心区",
      "__v":0
        }
    }

## 23. 获取用户下面的订单数量

### 请求URL：

    http://localhost:5000/manage/wo/count

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |parentIds   |Y       |array   |父级分类id数组
    |roleId      |Y       |string   |用户角色id
    |userId      |Y       |string   |用户id

### 返回示例：

    {
      "status":0,
      "data":[7,1,1,1,0]
    }

## 24 . 获取用户下面的订单数量

### 请求URL：

    http://localhost:5000/manage/wo/count

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |parentIds   |Y       |array   |父级分类id数组
    |roleId      |Y       |string   |用户角色id
    |userId      |Y       |string   |用户id

### 返回示例：

    {
      "status":0,
      "data":[7,1,1,1,0]
    }

## 25 . 根据用户id获取订单的月份数量信息

### 请求URL：

    http://localhost:5000/manage/wo/monthData

### 请求方式：

    GET

### 参数类型:

    |参数		     |是否必选 |类型     |说明
    |roleId      |Y       |string   |用户角色id
    |userId      |Y       |string   |用户id

### 返回示例：

    {
    "status":0,
    "data":
     [
    	{"_id":7,"name":[{"name":"搬运\\个人搬家","count":1}]},
    	{"_id":5,"name":[{"name":"搬运\\公司搬运","count":2},{"name":"室外\\草地修建","count":1},	{"name":"活动策划\\公司团建","count":1},{"name":"搬运\\个人搬家","count":4}]},
    	{"_id":8,"name":[{"name":"室内\\办公室打扫","count":1}]}
     ]
    }



## 26. 根据WoId/desc搜索服务申请分页列表

### 请求URL：

    http://localhost:5000/manage/wo/searchServiceWo?pageNum=1&pageSize=3&address=12

### 请求方式：

    GET

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |pageNum       |Y       |Number   |页码
    |pageSize      |Y       |Number   |每页条目数
    |serviceName   |N       |String   |根据订单类型搜索
    |address       |N       |String   |根据订单搜索

### 返回示例：

    {
      "status":0,
      "data":{"pageNum":1,
      "total":1,
      "pages":1,
      "pageSize":3,
      "list":[
    	{
    	  "status":4,
    	  "imgs":[],
    	  "serviceStaffId":"",
    	  "_id":"5eb29a3db9829e55444f4232",
    	  "woId":"868339",
    	  "userId":"5e7abb8e29f18c2f683b2572",
    	  "createDate":1588849574175,
    	  "serviceName":"搬运\\个人搬家",
    	  deadline":1589540774175,
    	  "parentId":"5e8a8f4fe062ff3724227616",
    	  "selfId":"5e8aecc142a417101814b752",
    	  "cost":100,
    	  "detail":"<h1>hhh</h1>\n<h1>;'';'''</h1>\n",
    	  "address":"湖南省长沙市天心区",
    	  "__v":0
    	  }
    	 ]
      }
    }

## 27.判断用户是否拥有管理员权限

### 请求URL：

    http://localhost:5000/manage/user/auth

### 请求方式：

    GET

### 参数类型:

    |参数		|是否必选 |类型     |说明
    |roleId   |Y       |String   |用户权限id

### 返回示例：

```
{"status":0,"hasAuth":true}
```

