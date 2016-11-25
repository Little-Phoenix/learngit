# 移动前端开发之 viewport 的深入理解
  在移动设备上进行网页的重构或开发，首先得搞明白的就是移动设备上的viewport了，只有明白了viewport的概念以及弄清楚了跟viewport有关的meta标签的使用，才能更好的让我们的网页适配或响应各种不同分辨率的移动设备。

## viewport 的概念
  通俗的将，移动设备上的viewport 就是设备的屏幕上能用来显示我们的网页的那一块区域，在具体一点，就是浏览器上用来显示网页的那部分区域，但viewport又不局限于浏览器可视区域的大小，它可能比浏览器的可视区域要大，也可能比浏览器的可视区域要小。在默认情况下，一般来讲，移动设备上的viewport都要大于浏览器可视区域的，这是因为考虑到移动设备的分辨率相对于桌面电脑来说都比较小，所以为了能在移动设备上显示那些传统的桌面浏览器设计的网站，移动设备上的浏览器都会把自己默认的viewport设为980px或1024px(也可能是其他值，这个是由设备自己决定的)，但带来的后果就是浏览器会出现横向滚动条，因为浏览器可视区域的宽度是比这个默认的viewport的宽度要小的。

## css中的1px并不等于设备的1px
  在css中我们一般使用px作为单位，在桌面浏览器中css的一个像素旺旺都是对着电脑屏幕的一个物理像素，这可能会造成我们的一个错觉，那就是css中的像素就是设备的物理像素。但实际情况却并非如此，css中的像素只是一个抽象单位，在不同的设备或不同的环境中，css中的1px所代表的设备物理像素是不同的。在为桌面浏览器设计的网页中，我们无需对这个斤斤计较，但在移动设备上，必须弄明白这点。在早先的移动设备中，屏幕像素密度都比较低，如iphone3，它的分辨率为320 * 480，在iphone3上，一个css像素确实等于一个屏幕物理像素的，其他品牌的移动设备也是这个道理。例如安卓设备根据屏幕像素密度可分为Idpi、mdpi、hdpi、xhdpi等不同的等级，分辨率也是五花八门，安卓设备上的一个css像素相当于多少个屏幕屋里像素，也因设备的不同而不同，没有一个定论。<br>

  还有一个因素也会引起css中px的变化，那就是用户缩放。例如，当用户把页面放大一倍，那么css中1px所代表的物理像素也会增加一倍；反之把页面缩小一倍，css中1px所代表的物理像素也会减少一倍。<br>

  在移动端浏览器中以及某些桌面浏览器中，window对象有一个devicePixelRatio属性，它的官方的定义为:设备物理像素和设备独立像素的比例，也就是devicePixelRatio = 物理像素/独立像素。css中的px就可以看作是设备的独立像素，所以通过devicePixelRatio，我们可以知道该设备上一个css像素代表多少个物理像素。例如，子Retina屏的iphone上，devicePixelRatio的值为2，也就是说1个css像素相当于2个物理像素。但是要注意的是，devicePixelRatio在不同的浏览器中还存在些许的兼容性问题，所以我们现在还并不能完全信赖这个东西。


## PPK 的关于三个 viewport 的理论

  ppk大神对于移动设备上的 viewport 有着非常多的研究，ppk 认为，移动设备上有三个 viewport 。<br>

  首先，移动设备上的浏览器认为自己必须能让所有的网站都正常显示，即使是那些不是为移动设备设计的网站。但如果以浏览器的可视区域作为 viewport 的话，因为移动设备的屏幕都不是很宽，所以那些为桌面浏览器设计的网站放到移动设备上显示时，必然会因为移动设备的 viewport 太窄，而挤作一团，甚至布局什么的都会乱掉。也许有人会问，现在不是有很多手机分辨率都非常大吗，比如768*1024，或者1080*1920这样，那这样的手机用来显示为桌面浏览器设计的网站是没问题的吧？ 前面我们已经说了，css中的1px并不是代表屏幕上的 1px，你分辨率越大，css 中 1px 代表的物理像素就会越多，devicePixelRatio 的值也越大，这很好理解，因为你分辨率增大了，但屏幕尺寸并没有变大多少，必须让css中1px代表更多的物理像素，才能让1px 的东西在屏幕上的大小与那些低分辨率的设备差不多，不然就会因为太小而看不清。所以在1080 * 1920 这样的设备上，在默认情况下，也许你只要把一个 div 的宽度设为 300 多px（视 devicePixelRatio 的值而定），就是满屏的宽度了，回到正题上来，如果把移动设备上浏览器的可视区域设为 viewport 的话，某些网站就会因为 viewport 太窄而显示错乱，所以这些浏览器就决定默认情况下把 viewport 设为一个较宽的值，比如 980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。ppk把这个浏览器默认的 viewport 叫做 layout viewport 。这个 layout viewport 的宽度可以通过 document.documentElement.clientWidth 来获取。 <br>

  然而， layout viewport 的宽度是大于浏览器可视区域宽度的，所以我们还需要一个 viewport 来代表浏览器可视区域的大小， ppk 拜这个viewport 叫做 visual viewport 。visual viewport 的宽度可以通过 winner.innerWidth 来获取，但在 Android 2， Opera mini 和 UC 8 中无法正确获取。 <br>

  ppk 把移动设备上的 viewport 分为 layout viewport、visual viewport 和 ideal viewport 三类，其中的 ideal viewport 是最适合移动设备的 viewport ，ideal viewport 的宽度等于移动设备的屏幕宽度，只要在css 中把某一元素的宽度设为 ideal viewport 的宽度 （单位用 px），那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为 100% 的效果。ideal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对 ideal viewport 而设计的网站，不需要用户手动缩放，也不需要出现横向滚动条，都可以完美的呈现给用户。

## 利用meta标签对viewport进行控制
  移动设备默认的viewport是layout viewport，也就是那个比屏幕要宽的viewport，但在进行移动设备网站的开发时，我们需要的是ideal viewport。那么怎么才能得到ideal viewport呢？就该轮到 meta 标签出场了。

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximun-scale=1.0, user-scalable=0">

  该meta标签的作用是让当前 viewport 的宽度等于设备的宽度，同时不允许用户手动缩放。也许允不允许用户缩放不同的网站有不同的要求，但让viewport的宽度等于设备的宽度，这个应该是大家都想要的效果，如果你不这样设定的话，那就会使用那个比屏幕宽的默认viewport，也就是说会出现横向滚动条。<br>

  这个name为viewport 的meta 标签到底有哪些东西，又都有什么作用？ <br>

  meta viewport 标签首先是由苹果公司在其 safari 浏览器中引入的，目的就是解决移动设备的 viewport 问题。后来安卓以各大浏览器厂商也都纷纷效仿，引入对meta viewport 的支持，事实证明这个东西是非常有用的。 <br>

  在苹果的规范中，meta viewport 有六个属性（暂且把content 中的那些东西称为一个个属性和值），如下：
| width | 设置laylout viewport 的宽度，为一个正整数，或字符串“device-width” |
| initial-scale | 设置页面的初始缩放值，为一个数字，可以带小数 |
| minimum-scale | 允许用户的最小缩放值，为一个数字，可以带小数 |
| maximum-scale | 允许用户的最大缩放值，为一个数字，可以带小数 |
| height | 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用 |
| user-scalable | 是否允许用户进行缩放，值为"no" 或 "yes" ，no 代表不允许，yes 代表允许 |

  这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。 <br>

  此外，在安卓中还支持 target-densitydpi 这个私有属性，它表示目标设备的密度等级，作用是决定 css 中的1px 代表多少物理像素

| target-densitydpi | 值可以为一个数值或 high-dpi、medium-dpi、low-dpi、device-dpi 这几个字符串中的一个 |

  特别说明的是，当 target-densitydpi = device-dpi时，css中的1px 会等于物理像素中的1px； <br>

  因为这个属性只有安卓支持，并且安卓已经决定要废弃target-densitydpi 这个属性了，所以这个属性我们要避免进行使用。

## 把当前的viewport 宽度设置为 ideal viewport 的宽度

  要得到 ideal viewport 就必须把默认的 layout view 的宽度设为移动设备的屏幕宽度。因为 meta viewport 中的 width 能控制 layout viewport 的宽度，所以我们只需要把 width 设置为 device-width 这个特殊的值就行了。

    <meta name="viewport" content="width=device-width">

  通过 width = device-width ，所以浏览器都能把当前的 viewport 宽度变成 ideal viewport 的宽度，但要注意的是，在 iphone 和 ipad 上，无论是竖屏还是横屏，宽度都是竖屏时 ideal viewport 的宽度。这样的写法看起来谁都会做，可是你肯定不知道：

    <meta name="viewport" content="initial-scale=1">

  这句代码也能达到和前一句代码一样的效果，也可以把当前的 viewport 变为ideal viewport <br>

  因为从理论上来讲，这句代码的作用只是不对当前的页面进行缩放，也就是页面本该是多大就是多大。那为什么会有 width = device-width 的效果呢 ？ <br>

  要想清楚这件事情，首先你得弄明白这个缩放是相对于什么来缩放的，因为这里的缩放值是1， 也就是没缩放，但却达到了 ideal viewport 的效果，所以答案就只有一个了，缩放是相对于 ideal viewport 来进行缩放的，当对 ideal viewport 进行100% 的缩放，也就是缩放值为1的时候，不就得到了 ideal viewport 吗 ？ 事实证明 的却是这样的。 <br>

  测试结果表明 initial-scale = 1也能把当前的 viewport 宽度变成 ideal viewport 的宽度，但这次轮到了 window phone 上的 IE 无论是竖屏还是横屏都把宽度设为竖屏时 ideal viewport 的宽度。但这点小瑕疵已经无关紧要了。 <br>

  但如果 width 和 initial-scale = 1 同时出现，并且还出现了冲突呢 ？ 比如：

    <meta name="viewport" content="width=400, initial-scale=1" >

  width=400 表示把当你牵 viewport 的宽度设定为 400px ,initial-scale=1 则表示把viewport的宽度设定为 ideal viewport 的宽度，那么浏览器到底该服从哪个命令呢？ 是书写顺序在后面的那个吗？ 不是。当遇到这种情况时，浏览器会取它们两个中较大的那个值。例如，当width = 400, ideal viewport 的宽度为 320 时，取的是400；当width = 400， ideal viewport 的宽度为 480时，取的是 ideal viewport 的宽度 （ps: 在uc9浏览器中，当 initial-scale = 1时，无论width 属性的值为多少，此时 viewport 的宽度永远都是 ideal viewport 的宽度） <br>

  最后，总结一下，要把当前的 viewport 宽度设为ideal viewport 的宽度，即可以设置 width = device-width， 也可以设置 initial-scale = 1，但这两者各有一个小缺陷，就是 iphone、ipad 以及 IE 会横竖屏部分，通通以竖屏的 ideal viewport 宽度为准。所以，最完美的写法应该是，两者都写上去，这样就 initial-scale = 1解决了 iphone、ipad 的毛病，width = device-width 则解决了 IE 的毛病：

    <meta name="viewport" conent="width=device-width, initial-scale=1">

## 关于 meta viewport 的更多知识

  1. 关于缩放以及 initial-scale 的默认值

  首先我们先来讨论下缩放的问题，前面已经提到过，缩放是相对于 ideal viewport 来缩放的，缩放值越大，当前 viewport 的宽度就会越小，反之亦然。例如在 iphone 中，ideal viewport 的宽度是 320px，如果我们设置 initial-scale = 2，此时 viewport 的宽度会变为只有160px了，这也好理解，放大了一倍嘛，就是原来 1px 的东西变成 2px 了，但是 1px 变为 2px 并不是把原来320px 变为 640px 了，而是在实际宽度不变的情况下，1px 变的跟原来的 2px 的长度一样了。所以放大2倍后 原来需要 320px 才能填满的宽度现在只需要 160px 就做到了。因此，我们可以得出一个公式： <br>

    visual viewport宽度 = ideal viewport 宽度 / 当前缩放值
    当前缩放值 = ideal viewport 宽度 / visual viewport 宽度

  ps: visual viewport 的宽度是指浏览器可视区域的宽度。 <br>

  大多数浏览器都符合这个理论，但是安卓上的原生浏览器以及 IE 有些问题。安卓自带的 webkit 浏览器只有在 initial-scale = 1 以及没有设置 width 属性时才是表现正常的，也就相当于这理论在它身上基本没用；而IE则根本不甩 initial-scale 这个属性，无论你给他设置什么，initial-scale  表现出来的效果永远是 1； <br>

  好了，再说下initial-scale 的默认值问题，就是不写这个属性的时候，它的默认值会是多少呢？ 很显然不会是1，当前的layout viewport 宽度会被设为 ideal viewport 的宽度，但前面说了，各浏览器默认的 layout viewport 宽度一般都是 980啊，1024啊，800啊等等这些值，没有一开始就是ideal viewport 的宽度的，所以 initial-scale 的默认值肯定不是 1 ，安卓设备上的initial-scale 默认值好像没有方法能够得到，或者就是干脆它就没有默认值，一定要你显示的写出来这个东西才会起作用，我们不管它了，这里我们重点说一下iphone和ipad上的 initial-scale 默认值。 <br>

  根据测试，我们可以在 iphone 和 ipad 上得到一个结论，就是无论你给 layout viewport 设置的宽度是多少，而又没有指定初始的缩放值的话，那么 iphone 和 ipad 会自动计算 initial-scale 这个值，以保证当前 layout viewport 的宽度在缩放后就是浏览器可视区域的宽度，也就是说不会出现横向滚动条。比如说，在iphone 上，我们不设置任何的 viewport meta 标签，此时 layout viewport 的宽度为 980px，但我们可以看到浏览器并没有出现横向滚动条，浏览器默认的把页面缩小了。根据上面的公式，当前缩放值 = ideal viewport 宽度/ visual viewport 宽度，我们可以得出 <br>

    当前缩放值 = 320 / 980

  也就是当前的 initial-scale 默认值应该是0.33 这样子。当你指定了 initial-scale 的值后，这个默认值就不起作用了。 <br>

  总之记住这个结论就行了： `在 iphone 和 ipad 上，无论你给 viewport 设置的宽度是多少，如果没有指定默认的缩放值，则 iphone 和 ipad 会自动计算这个缩放值，以达到当前页面不会出现横向滚动条（或者说 viewport 的宽度就是屏幕的宽度）的目的。`

  2. 动态改变 meta viewport 标签

    第一种方法：<br>

    可以使用 document.write 来动态输出 meta viewport 标签，例如：

      document.write('<meta name="viewport" content="width=device-width, initial-scale=1">')

    第二种方法：<br>

    通过 setAttribute 来改变

      <meta id="testViewport" name="viewport" content="width = 380">
      <script>
        var mvp = document.getElementById('testViewport');
        mvp.setAttribute('content', 'width=480');
      </script>

    安卓2.3 自带浏览器上的一个 bug

      <meta name="viewport" content="width=device-width">

      <script type="text/javascript">
        alert(document.documentElement.clientWidth); //弹出600， 正常情况应该弹出320；
      </script>

      <meta name='viewport' content="width=600">

      <script type="text/javascript">
        alert(document.documentElement.clientWidth); //弹出320，正常情况应该弹出600；
      </script>

    测试的手机 ideal viewport 宽度为 320排序， 第一次弹出的值是 600，但这个值应该是 meta 标签的结果啊，然后第二次弹出的值是 320，这才是第一行 meta 标签所达到的效果啊，所以在安卓2.3的自带浏览器中，对 meta viewport 标签进行覆盖或更改，会出现让人非常迷糊的结果。

## 结语

  如果不设置 meta viewport 标签，那么移动设备上浏览器默认的宽度值为 800px,980px, 1024px等这些，总之是大于屏幕宽度的。这里的宽度所用的单位 px 都是指css中的 px，它跟代表实际屏幕物理像素的px 不是一回事。 <br>

  第二，每个移动设备浏览器中都有一个理想的宽度，这个理想的宽度是指 css 中的宽度，跟设备的物理宽度没有关系，在css中，这个宽度就相当于100% 的所代表的那个宽度。我们可以用 meta 标签把 viewport 的宽度设为那个设为那个理想的宽度，如果不知道这个设备的理想宽度是多少，那么用 device-width 这个特殊值就行了，同时 initial-scale = 1也有把 viewport 的宽度设为理想宽度的作用。所以，我们可以使用：

    <meta name="viewport" content="width=device-width, initial-scale=1">

  来得到一个理想的 viewport （也就是前面说的 ideal viewport） <br>

  为什么需要有理想的 viewport 呢？比如一个分辨率为 320 * 480 的手机理想 viewport 的宽度是320px,而另一个屏幕尺寸相同但分辨率为640 * 960 的手机的理想宽度也是320px，那为什么分辨率大的这个手机的理想宽度要跟分辨率小的那个手机的理想宽度一样呢？这是因为，只有这样才能保证同样的网站在不同分辨率的设备上看起来都是一样或差不多的。实际上，现在市面上虽然有那么多不同品牌不同分辨率的手机，但它们的理想 viewport 宽度归纳起来无非也就是 320、360、398、400等集中，都是非常接近的，理想宽度的相近也就意味着我们针对某个设备的理想 viewport 而做出的网站，在其他设备上的表现也不会相差非常多甚至是表现一样的。
