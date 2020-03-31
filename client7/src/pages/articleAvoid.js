import React,{Component} from 'react';
import ReactDom from 'react-dom';
import './css/commonCss/reset.css';
import './css/commonCss/iconfont.css';
import './css/articleAvoid.css';
import Header from './js/components/header.js';
import ArticleHeader from './js/components/articleHeader.js';
import Footer from './js/components/footer.js';
import Regist from './js/components/regist.js'
import Login from './js/components/login.js';

class ArticleAvoid extends Component {
  constructor(props){
    super(props);
    this.state = {
      registOpenToggle: false,
      loginOpenToggle: false,
      login: false,
      avoidData: [
        {
          id: '1',
          one: '西红柿',
          two: '虾',
          why: '虾肉内含”五价砷“，无毒，但与西红柿同食将还原成三价砷（俗称砒霜）有毒应慎用。'
        },
        {
          id: '2',
          one: '蜂蜜',
          two: '葱',
          why: '蜂蜜和大葱同食会引起中毒，伤眼睛，引起眼睛不适，严重会导致失明。'
        },
        {
          id: '3',
          one: '鸡肉',
          two: '芹菜',
          why: '鸡肉和芹菜同食会伤元气，可使身体免疫力降低，会引起多种疾病，尽量少在一起食用。'
        },
        {
          id: '4',
          one: '菌类',
          two: '驴肉',
          why: '驴肉和菌类同食会引发脑血管病，重者不及时抢救会死亡。'
        },
        {
          id: '5',
          one: '胡萝卜',
          two: '白萝卜',
          why: '胡萝卜与白萝卜长期同食容易导致免疫力低下，白血病。'
        },
        {
          id: '6',
          one: '土豆',
          two: '甜柿子',
          why: '土豆和甜柿子长期同食可导致尿结石，肾结石，应尽量少吃。'
        },
        {
          id: '7',
          one: '红薯',
          two: '西红柿',
          why: '红薯与西红柿同食会出现呕吐、腹痛、腹泻，可引发结石病，食用应尽量避开'
        },
        {
          id: '8',
          one: '鸡肉',
          two: '菊花',
          why: '鸡肉与菊花茶同食会中毒，后果严重，应坚决避开。'
        },
        {
          id: '9',
          one: '醋',
          two: '羊肉',
          why: '醋与羊肉同食会引发心脏病，所以吃羊肉时，尽量不要放醋。'
        },
        {
          id: '10',
          one: '白萝卜',
          two: '酒',
          why: '胡萝卜含萝卜素与酒精一起进入人体，就会在肝脏中产生毒素，从而损害肝脏功能。'
        },
        {
          id: '11',
          one: '南瓜',
          two: '羊肉',
          why: '南瓜与羊肉同食会大伤元气，免疫力低下，导致多种病症。'
        },
        {
          id: '12',
          one: '柿子',
          two: '螃蟹',
          why: '同食腹泻'
        },
        {
          id: '13',
          one: '香蕉',
          two: '土豆',
          why: '两者一起吃很有可能使脸部生斑。现代营养学以为，香蕉和马铃薯都包含大量碳水化合物，常常一起食用容易使人发胖。'
        },
        {
          id: '14',
          one: '香蕉',
          two: '牛奶',
          why: '牛奶中含有可观的蛋白质，香蕉中包含较多的果酸，二者相遇，可以使蛋白质形成不容易消化的凝块，很有可能造成消化不良。'
        },
        {
          id: '15',
          one: '香蕉',
          two: '山药',
          why: '山药和香蕉一起吃会引起腹部胀痛'
        },
        {
          id: '16',
          one: '香蕉',
          two: '哈密瓜',
          why: '两者都属于凉性瓜果，并且含糖量都非常高，特别不适合糖尿病患者食用。'
        },
        {
          id: '17',
          one: '香蕉',
          two: '红薯',
          why: '地瓜含有大量淀粉，吃后会分泌大量胃酸，香蕉包含高钾，两者一起吃也许会引起身体不适感。'
        },
        {
          id: '18',
          one: '香蕉',
          two: '火腿',
          why: '火腿上包含亚硝酸盐，香蕉包含二价胺。二者一起吃会产生亚硝胺，这是中致癌物质，尽管浓度不高，但是仍该尽可能避免。'
        },
        {
          id: '19',
          one: '鱼',
          two: '山楂',
          why: '一起吃时会形成便秘，增加肠内毒物的吸收，导致腹疼、呕吐、恶心。'
        },
        {
          id: '20',
          one: '鱼',
          two: '绿豆',
          why: '绿豆中含有大量的维生素B1，鱼却包含会破坏维生素B1的酶，两者搭配一起吃，也许会使维生素B遭受破坏。'
        },
        {
          id: '21',
          one: '鱼',
          two: '番茄',
          why: '两者一起吃，番茄中的维生素C会对鱼肉中的铜元素的释放产生抑制作用，进而影响人体对铜元素的吸收利用。'
        },
        {
          id: '22',
          one: '鱼',
          two: '红枣',
          why: '大枣中包含有机酸，和高蛋白的鱼同吃，会造成鱼肉中的蛋白质凝结成块，也许会造成消化不良。'
        },
        {
          id: '23',
          one: '鱼',
          two: '毛豆',
          why: '毛豆中含有大量的维生素B1，鱼却包含会破坏维生素B1的酶，两者一起吃会使维生素B1遭受破坏，影响人体对营养的吸收。'
        },
        {
          id: '24',
          one: '南瓜',
          two: '香菜',
          why: '而这一起吃会破坏香菜中维生素C，失去原有的营养价值'
        },
        {
          id: '25',
          one: '南瓜',
          two: '蟹肉',
          why: '南瓜包含葫芦巴碱与瓜氨酸，如果和含高蛋白的蟹肉一起吃，易在胃中形成难以消化的物质，很有可能造成结石，导致腹泻、腹痛。'
        },
        {
          id: '26',
          one: '南瓜',
          two: '小白菜',
          why: '小白菜含可观的维生素C，而南瓜包含维生素C分解酶，两者一起吃会影响人体对维生素C的吸收。'
        },
        {
          id: '27',
          one: '南瓜',
          two: '山楂',
          why: '山楂含有大量维生素C,为南瓜中含维生素C分解酶，若两者一起吃，维生素C被分解破坏，则会影响营养的吸收。'
        },
        {
          id: '28',
          one: '南瓜',
          two: '鲤鱼',
          why: '南瓜通经络，利小便；鲤鱼有利小便，消腹水的作用，如果和南瓜一起吃，也许引起尿频，腹泻。'
        },
        {
          id: '29',
          one: '南瓜',
          two: '醋',
          why: '南瓜富含维生素与膳食纤维，而醋里的醋酸会破坏南瓜的营养成分，两者一起吃也许会造成人生病。'
        },
        {
          id: '30',
          one: '南瓜',
          two: '虾',
          why: '南瓜和虾一起吃会引起痢疾。'
        },
        {
          id: '31',
          one: '南瓜',
          two: '羊肉',
          why: '南瓜益气补中，羊肉大热补虚，两补一起吃，令人肠胃不适，造成肚胀，便秘。'
        },
        {
          id: '32',
          one: '南瓜',
          two: '油菜',
          why: '南瓜包含维生素C分解酶，如果和含有大量维生素C的油白菜一起吃会降低油白菜的营养价值。'
        },
        {
          id: '33',
          one: '南瓜',
          two: '带鱼',
          why: '带鱼含有大量蛋白质，维生素B1，维生素B2，并包含适量的脂肪，如果和南瓜一起吃会造成消化不良。'
        },
        {
          id: '34',
          one: '南瓜',
          two: '辣椒',
          why: '南瓜包含维生素C分解酶，如果和含有大量维生素C的辣椒同炒，会影响维生素C的吸收。'
        },
        {
          id: '35',
          one: '萝卜',
          two: '橘子',
          why: '易患甲状腺肿;'
        },
        {
          id: '36',
          one: '芝麻',
          two: '鸡肉',
          why: '鸡肉和芝麻一起吃，严重的会造成死亡。'
        },
        {
          id: '37',
          one: '牛奶',
          two: '柠檬',
          why: '柠檬中包含柠檬酸，而牛奶含有大量蛋白质与钙，如果将柠檬汁混入牛奶中，柠檬酸则会和牛奶中的蛋白质与钙结合，形成蛋白质凝块与不溶性草酸钙，会影响胃肠道的吸收消化。'
        },
        {
          id: '38',
          one: '香蕉',
          two: '牛奶',
          why: '牛奶中含可观的蛋白质，香蕉中包含较多的果酸，二者相遇，可以使蛋白质形成不容易消化的凝块，很有可能造成消化不良。'
        },
        {
          id: '39',
          one: '牛奶',
          two: '红糖',
          why: '红糖中包含有机酸及其它杂质，牛奶中的蛋白质可和红糖中的有机酸结合产生沉淀，影响人体对蛋白质的吸收。平常要避免冲牛奶时加红糖。'
        },
        {
          id: '40',
          one: '牛奶',
          two: '杨梅',
          why: '杨梅中的果酸和牛奶中的蛋白质结合，可以使蛋白质凝固，影响人体对蛋白质的吸收利用。'
        },
        {
          id: '41',
          one: '牛奶',
          two: '菠萝',
          why: '牛奶中含有大量蛋白质与钙，菠萝中包含较多的柠檬酸，柠檬酸可和蛋白质和钙结合，形成不容易消化的物质，两者一起吃还可能造成腹泻。'
        },
        {
          id: '42',
          one: '牛奶',
          two: '白酒',
          why: '酒类和奶类合饮，不但降低奶类的价值，并且奶类多含脂肪，在白酒中的乙醇刺激下，更促使脂肪向肝中流入，进而引起脂肪肝的形成。'
        },
        {
          id: '43',
          one: '牛奶',
          two: '西兰花',
          why: '牛奶富含蛋白质与矿物质钙，绿菜花中包含较多的维生素与微元素，同时食用会影响牛奶中钙的吸收。'
        },
        {
          id: '44',
          one: '牛奶',
          two: '菠菜',
          why: '菠菜总的草酸可与牛奶中的钙结合形成草酸钙沉淀，不利牛奶中钙的吸收。'
        },
        {
          id: '45',
          one: '牛奶',
          two: '韭菜',
          why: '韭菜中包含大量草酸，可和牛奶中的钙结合成不利于吸收的草酸钙，影响牛奶中钙的吸收消化。'
        },
        {
          id: '46',
          one: '牛奶',
          two: '山楂',
          why: '山楂中富含维生素C，牛奶中包含较多的优质蛋白质，同时食用可以使蛋白质变性。造成腹泻、腹痛等胃肠道病患。'
        },
        {
          id: '47',
          one: '牛奶',
          two: '米汤',
          why: '牛奶与米汤混合食用，可以增进吸收消化，然而它们能对维生素A起到破坏作用，婴儿长时间食用，会影响视力。'
        },
        {
          id: '48',
          one: '牛奶',
          two: '果汁',
          why: '果汁中包含较多的草酸与维生素C，能令牛奶中的蛋白质变性，凝结成块，不容易吸收消化，与此同时还易造成腹疼、肚胀、腹泻。'
        },
        {
          id: '49',
          one: '牛奶',
          two: '柑橘',
          why: '牛奶中的蛋白质，万一碰上柑橘中的草酸，变回发生凝固，进而影响消化和吸收。'
        },
        {
          id: '50',
          one: '牛奶',
          two: '菜花',
          why: '牛奶含丰富的钙质，菜花含有化学成分影响钙的消化吸收'
        },
        {
          id: '51',
          one: '牛奶',
          two: '橙子',
          why: '牛奶中包含较多的蛋白质，能与橘子中的果酸与维生素C发生反应凝结成块，影响吸收消化，甚至会造成肚胀，腹泻。'
        },
        {
          id: '52',
          one: '牛奶',
          two: '巧克力',
          why: '牛奶和巧克力一起吃，则牛奶中的钙和巧克力中的草酸则会结合形成草酸钙，影响牛奶中钙的吸收。长时间共用，可引起头发干枯，腹泻，出现缺钙与生长发育迟缓等。'
        },
        {
          id: '53',
          one: '海带',
          two: '柿子',
          why: '两者同吃会生成不溶性的结合物，可能导致胃肠道不适。'
        },
        {
          id: '54',
          one: '海带',
          two: '茶',
          why: '肠胃不适。'
        },
        {
          id: '55',
          one: '海带',
          two: '酸涩水果',
          why: '肠胃不适。'
        },
        {
          id: '56',
          one: '海带',
          two: '猪血',
          why: '两者同吃不利于消化吸收，导致便秘。'
        },
        {
          id: '57',
          one: '鸡肉',
          two: '兔肉',
          why: '兔肉味甘寒酸冷，鸡蛋甘平微寒。两者各有些生物活性物质，如果同炒共食，则易产生刺激胃肠道的物质，并且很可能引起腹泻。'
        },
        {
          id: '58',
          one: '鸡蛋',
          two: '大蒜',
          why: '大蒜油特殊的气味，有刺激性，能令局部血管扩张，所以其性热。鸡蛋甘平性凉，有滋阴镇静作用。蒜和鸡蛋在性味和功能上皆不相和，所以不宜一起吃。'
        },
        {
          id: '59',
          one: '鸡蛋',
          two: '豆浆',
          why: '豆浆中包含胰蛋白酶抑制物，鸡蛋中包含一种粘性蛋白，能和胰蛋白酶结合，使胰蛋白酶失去作用，进而阻碍蛋白质的分解。两者一起吃会影响蛋白质的吸收利用。'
        },
        {
          id: '60',
          one: '鸡蛋',
          two: '菠萝',
          why: '鸡蛋中包含较多的蛋白质，菠萝中富含果酸。若两者同时食用，果酸可以使蛋白质凝固，影响蛋白质的吸收消化，降低鸡蛋的营养价值。'
        },
        {
          id: '61',
          one: '鸡蛋',
          two: '柿子',
          why: '一起吃会引起腹疼、腹泻、呕吐等症状'
        },
        {
          id: '62',
          one: '鸡蛋',
          two: '橘子',
          why: '鸡蛋富含蛋白质，如果与富含果酸的橘子同时食用，果酸可以使蛋白质凝固，影响蛋白质的消化与吸收，设置产生不良症状。'
        },
        {
          id: '63',
          one: '鸡蛋',
          two: '味精',
          why: '味精的主要成分是谷氨酸，鸡蛋中包含多类氨基酸，其中也包括谷氨酸。所以二者公用会引起谷氨酸摄取过多，对身体健康有害。'
        },
        {
          id: '64',
          one: '鸡蛋',
          two: '大葱',
          why: '大葱中包含的大量生物活性物质，可破坏鸡蛋中的蛋白质。'
        },
        {
          id: '65',
          one: '鸡蛋',
          two: '白糖',
          why: '鸡蛋和白糖同煮，可以使蛋白质中的氨基酸形成果糖基赖氨酸的结合物。这类物质不仅不容易被人体吸收消化，并且还会对人体产生不良影响。'
        },
        {
          id: '66',
          one: '鸡蛋',
          two: '鲤鱼',
          why: '鸡蛋不宜和鲤鱼共食，怀孕女性对此更要尤其注意，因鱼类有腥气，和鸡蛋同煮易生异味，影响食欲。'
        },
        {
          id: '67',
          one: '鸡蛋',
          two: '鳌鱼',
          why: '鳖鱼中包含较多的生物活性物质，而鸡蛋是优质的完全蛋白质，同食食用会造成鸡蛋中的蛋白质变性而降低其营养价值。'
        },
        {
          id: '68',
          one: '核桃',
          two: '甲鱼',
          why: '核桃和甲鱼搭配食用，可造成中毒'
        },
        {
          id: '69',
          one: '核桃',
          two: '白酒',
          why: '核桃性热，多吃爆火，白酒甘辛大热。二者一起吃易致血热，轻者燥咳，严重的时候会造成鼻出血。'
        },
        {
          id: '70',
          one: '核桃',
          two: '鸭肉',
          why: '核桃和鸭肉一起吃对健康有害'
        },
        {
          id: '71',
          one: '核桃',
          two: '黄豆',
          why: '一起吃可造成腹泻、腹痛、消化不良'
        },
        {
          id: '72',
          one: '柿子',
          two: '螃蟹',
          why: '同食腹泻'
        },
        {
          id: '73',
          one: '兔肉',
          two: '芹菜',
          why: '同食脱发'
        },
        {
          id: '74',
          one: '鹅肉',
          two: '鸡蛋',
          why: '同食伤元气'
        },
        {
          id: '75',
          one: '洋葱',
          two: '蜂蜜',
          why: '同食伤眼睛'
        },
        {
          id: '76',
          one: '香蕉',
          two: '芋头',
          why: '同食胀腹'
        },
        {
          id: '77',
          one: '猪肉',
          two: '棱角',
          why: '同食肚子痛'
        },
        {
          id: '78',
          one: '豆腐',
          two: '蜂蜜',
          why: '同食耳聋'
        },
        {
          id: '79',
          one: '萝卜',
          two: '木耳',
          why: '同食得皮炎'
        },
        {
          id: '80',
          one: '狗肉',
          two: '绿豆',
          why: '同食多吃易中毒'
        },
        {
          id: '81',
          one: '牛肉',
          two: '梅干菜',
          why: '同食生心闷'
        },
        {
          id: '82',
          one: '鸡肉',
          two: '芥菜',
          why: '同食伤元气'
        },
        {
          id: '83',
          one: '鹅肉',
          two: '鸭梨',
          why: '同食好生热病'
        },
        {
          id: '84',
          one: '海蟹',
          two: '大枣',
          why: '同食易得疾病'
        },
        {
          id: '85',
          one: '芥菜',
          two: '鸭梨',
          why: '同食发呕'
        },
        {
          id: '86',
          one: '羊肉',
          two: '西瓜',
          why: '同食伤元气'
        },
        {
          id: '87',
          one: '牛肉',
          two: '栗子',
          why: '同食呕吐'
        },
        {
          id: '88',
          one: '柿子',
          two: '白酒',
          why: '会胸闷'
        },
        {
          id: '89',
          one: '牛肉',
          two: '韭菜',
          why: '容易中毒'
        },
        {
          id: '90',
          one: '山楂',
          two: '胡萝卜',
          why: '维生素C遭破坏'
        },
        {
          id: '91',
          one: '豆腐',
          two: '小葱',
          why: '影响钙吸收'
        },
        {
          id: '92',
          one: '菠菜',
          two: '豆腐',
          why: '菠菜中含有大量的草酸。豆腐主要含蛋白质、脂肪和钙。草酸能够和钙起化学反应，生成不溶性的沉淀，人体无法吸收。严重的就会导致肾结石。而阻碍钙的吸收，将影响正处于发育阶段的儿童与青少年的身体健康。'
        },
        {
          id: '93',
          one: '菠菜',
          two: '海鲜',
          why: '因为菠菜中的硝酸盐，当硝酸盐碰上海鲜食材中所含的胺，就易转换成亚硝酸盐。而亚硝酸盐会在体内转换成致癌物质亚硝胺，这是致癌剧毒。此外，从中医角度说，菠菜性甘冷而滑，下气润燥，海鲜味甘大温，两者食物药性的性味功能皆不相协调。不宜同食'
        },
        {
          id: '94',
          one: '西瓜',
          two: '油果子',
          why: '发生呕吐'
        },
        {
          id: '95',
          one: '杏仁',
          two: '栗子',
          why: '引起胃疼'
        },
        {
          id: '96',
          one: '草莓',
          two: '樱桃',
          why: '上火'
        },
        {
          id: '97',
          one: '桔子',
          two: '柠檬',
          why: '会导致消化道溃疡穿孔'
        },
        {
          id: '98',
          one: '苹果',
          two: '海味',
          why: '二者同食，会有复杂的生化反应，产生岁人体不利的物质，引起腹痛、呕吐。'
        },
        {
          id: '99',
          one: '苹果',
          two: '萝卜',
          why: '苹果和萝卜同食会产生抑制甲状腺作用的物质，导致甲状腺肿'
        },
        {
          id: '100',
          one: '葡萄',
          two: '萝卜',
          why: '葡萄和萝卜同食，会产生抑制甲状腺作用的化合物，导致甲状腺肿痛。'
        },
        {
          id: '101',
          one: '葡萄',
          two: '海味食物',
          why: '葡萄中含有大量果酸，海味食物如鱼、虾等含有丰富的蛋白质和营养物质，一起进食的话，果酸不仅会使蛋白质凝固，而且会与海味食物中的钙元素结合，生成沉淀物，从而刺激肠胃，引起腹痛、呕吐。'
        },
        {
          id: '102',
          one: '桃',
          two: '甲鱼',
          why: '由于甲鱼中含有很多蛋白质，而桃含有鞣酸，两者同食会结合成一种凝固物质，不利于人体的吸收，营养价值会大打折扣。'
        },
        {
          id: '103',
          one: '猕猴桃',
          two: '肝脏',
          why: '两者同食会破坏猕猴桃中的维生素C,降低营养成分'
        },
        {
          id: '104',
          one: '猕猴桃',
          two: '黄瓜',
          why: '黄瓜中有对维生素C有破坏作用的维生素C分解酶'
        },
        {
          id: '105',
          one: '柿子',
          two: '章鱼',
          why: '两者都属寒冷食物，所以不宜同食，否则损坏肠胃，导致腹泻。'
        },
        {
          id: '106',
          one: '柿子',
          two: '海带、紫菜',
          why: '海带和紫菜中的钙离子会与柿子中所含的鞣酸结合，生成不溶性结合物，影响某些营养成分的消化吸收，导致胃肠道不适。'
        },
        {
          id: '107',
          one: '芒果',
          two: '大蒜',
          why: '易导致黄疸'
        },
        {
          id: '108',
          one: '柚子',
          two: '螃蟹',
          why: '两者同食会刺激胃肠，出现腹痛、恶心、呕吐等症状。'
        },
        {
          id: '109',
          one: '柚子',
          two: '胡萝卜、黄瓜',
          why: '同食会破坏柚子中维生素C的营养价值'
        },
        {
          id: '110',
          one: '柚子',
          two: '猪肝',
          why: '猪肝中富含铜、铁、锌等成分，一旦与柚子中的维生素C相遇就会加速金属离子的氧化而破坏原本的营养价值。'
        },
        {
          id: '111',
          one: '菠萝',
          two: '萝卜',
          why: '二者同食，萝卜中的维生素C酵酶就会破坏菠萝中的维生素C，降低营养价值。'
        },
        {
          id: '112',
          one: '荔枝',
          two: '动物肝脏',
          why: '会破坏荔枝中的维生素C'
        },
        {
          id: '113',
          one: '黄瓜/胡萝卜',
          two: '荔枝',
          why: '胡萝卜和黄瓜中有维生素C分解酶，它们与荔枝同食会破坏荔枝中的维生素C。'
        }
      ]
    };
    this.handleGotoRegist = this.handleGotoRegist.bind(this);
    this.handleGotoLogin = this.handleGotoLogin.bind(this);
    this.handleLoginClose = this.handleLoginClose.bind(this);
    this.handleRegistClose = this.handleRegistClose.bind(this);
    this.handleHeader = this.handleHeader.bind(this);
    // 注册成功
    this.registTrue = this.registTrue.bind(this);
    // 登录成功
    this.loginTrue = this.loginTrue.bind(this);
    // 退出登录
    this.exitLogin = this.exitLogin.bind(this);
  }
  handleHeader(e){
    let target = e.target||e.srcElement;
    console.log(target);
    switch(target.id){
      case 'loginBtn':
        this.setState({
          loginOpenToggle:true
        })
        break;
      case 'registBtn':
        this.setState({
          registOpenToggle:true
        })
        break;
    }
  }
  handleGotoRegist(){
    this.setState({
      registOpenToggle:true,
      loginOpenToggle:false
    })
  }
  handleGotoLogin(){
    this.setState({
      registOpenToggle:false,
      loginOpenToggle:true
    })
  }
  handleLoginClose(){
    this.setState({
      loginOpenToggle:false
    })
  }
  handleRegistClose(){
    this.setState({
      registOpenToggle:false
    })
  }
  registTrue(){
    let that = this;
    let closeTimer = setTimeout(() => {
      that.setState({
        registOpenToggle:false,
        login: true
      })
      clearTimeout(closeTimer);
    },1000)
  }
  loginTrue(){
    let that = this;
    let closeTimer = setTimeout(() => {
      that.setState({
        loginOpenToggle:false,
        login: true
      })
      clearTimeout(closeTimer);
    },1000)
  }
  exitLogin(){
    this.setState({
      login: false
    })
  }
  componentDidMount(){
    if(window.localStorage.email){
      this.setState({
        login: true
      })
    }
  }
  render(){
    let avoidDataLists = this.state.avoidData;
    let avoidDataListItem = avoidDataLists.map((item,index)=>
      <li key={item.id}>
        <h4>
          <span>{item.one}</span>
          <i>+</i>
          <span>{item.two}</span>
        </h4>
        <p>{item.why}</p>
      </li>
    );
    return(
      <div id="article-avoid">
        <Header handleHeader={this.handleHeader} login={this.state.login} exitLogin={this.exitLogin}/>
        <ArticleHeader articleTitle="食品搭配禁忌你知道多少" />
        <article>
          <ul>{avoidDataListItem}</ul>
        </article>
        {this.state.loginOpenToggle?<Login handleLoginClose={this.handleLoginClose} handleGotoRegist={this.handleGotoRegist} loginTrue={this.loginTrue}/>:null}
        {this.state.registOpenToggle?<Regist handleRegistClose={this.handleRegistClose} handleGotoLogin={this.handleGotoLogin} registTrue={this.registTrue}/>:null}
        <Footer />
      </div>
    );
  }
}
ReactDom.render(
  <ArticleAvoid />,
  document.getElementById('root')
)
