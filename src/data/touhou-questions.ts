
export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Option {
    text: string;
    vector: Vector3;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
    explanation: string;
}

export interface Chapter {
    id: string;
    title: string;
    intro: string;
    questionIds: number[];
}

export interface ArtworkTarget {
    id: string;
    title: string;
    vector: Vector3;
}

// Target A: Mystery/Boundary (Yukari/PCB) - Dimension X
// Target B: Intellect/Western (Patchouli/EoSD) - Dimension Y
// Target C: Eternity/Folklore (Kaguya/IN) - Dimension Z

export const targetArtworks: ArtworkTarget[] = [
    {
        id: "001",
        title: "戴珍珠耳环的少女 (八云紫)",
        vector: { x: 0.9, y: 0.2, z: 0.3 }
    },
    {
        id: "002",
        title: "The Bookworm (帕秋莉)",
        vector: { x: 0.2, y: 0.9, z: 0.2 }
    },
    {
        id: "003",
        title: "宫娥 (辉夜 & 永琳)",
        vector: { x: 0.3, y: 0.2, z: 0.9 }
    }
];

// Helper to create simple weight vectors
const W_X = { x: 0.8, y: 0.1, z: 0.1 }; // High X (PCB)
const W_Y = { x: 0.1, y: 0.8, z: 0.1 }; // High Y (EoSD)
const W_Z = { x: 0.1, y: 0.1, z: 0.8 }; // High Z (IN)
const W_N = { x: 0.1, y: 0.1, z: 0.1 }; // Low impact

export const chapters: Chapter[] = [
    {
        id: 'eosd',
        title: '第一章：红色的恶魔',
        intro: '西洋的神秘学符号重构与“红”之美学。\n在斯卡雷特家族的洋馆中，命运与破坏被赋予了神话的隐喻。',
        questionIds: [3, 4, 7, 13, 17, 19]
    },
    {
        id: 'pcb',
        title: '第二章：妖艳的樱花',
        intro: '幽冥的诗学与生死的境界。\n白玉楼的亡灵公主与境界的妖怪，演绎着跨越生死的“物哀”。',
        questionIds: [1, 2, 5, 8, 12, 18, 20]
    },
    {
        id: 'in',
        title: '第三章：不朽的满月',
        intro: '竹取物语的科幻解构与月之悖论。\n在永远亭的无限回廊中，时间与其说是静止，不如说是被“永恒”所囚禁。',
        questionIds: [6, 9, 10, 11, 14, 15, 16, 21]
    }
];

export const questions: Question[] = [
    {
        id: 1,
        text: "ZUN在《妖妖梦》音乐评论中提到，“天空的花都”这首曲子是以哪部名著为印象创作的？",
        explanation: "虽然舞台是普莉兹姆利巴的废洋馆，但说实话，我在写这首曲子的时候满脑子都是孙悟空腾云驾雾的样子（笑）。虽然是冥界，但那种近乎天界净土的轻飘飘的感觉，不觉得很配吗？（开啤酒声）",
        options: [
            { text: "源氏物语", vector: W_N },
            { text: "西游记", vector: W_X },
            { text: "红楼梦", vector: W_N },
            { text: "枕草子", vector: W_N }
        ]
    },
    {
        id: 2,
        text: "魂魄妖梦的佩刀“白楼剑”不仅能斩断迷惘，还能将幽灵送往何处？",
        explanation: "斩断迷惘的白楼剑。说起来，庭师的工作不就是修剪多余的枝叶吗？把这个概念延伸到幽灵身上，就是送去成佛（涅槃）了。真是方便的园艺工具啊。",
        options: [
            { text: "地狱", vector: W_N },
            { text: "涅槃", vector: W_X },
            { text: "现世", vector: W_N },
            { text: "永远亭", vector: W_N }
        ]
    },
    {
        id: 3,
        text: "在《红魔乡》原始立绘中，咲夜袖口上绣有的英文单词是什么，暗示了她力量的来源？",
        explanation: "那个袖子上的“Red Magic”。虽然现在没有了，但在最初的设计里，这可是暗示她力量来源的关键哦。毕竟是恶魔的红魔馆嘛，没有点神秘的契约怎么行。",
        options: [
            { text: "Time Stop", vector: W_N },
            { text: "Red Magic", vector: W_Y },
            { text: "Jack the Ripper", vector: W_N },
            { text: "Scarlet Destiny", vector: W_N }
        ]
    },
    {
        id: 4,
        text: "芙兰朵露持有的“莱瓦汀”（Lævateinn）在北欧神话中被存放在哪里？",
        explanation: "莱瓦汀在神话里是被关在九层锁的箱子里的。这点和芙兰朵露被关在地下室495年是不是很像？这种破坏力强到必须封印起来的感觉，正是我想表达的。",
        options: [
            { text: "瓦尔哈拉", vector: W_N },
            { text: "九把锁锁住的箱子", vector: W_Y },
            { text: "世界树的树根", vector: W_N },
            { text: "炎之国穆斯贝尔海姆", vector: W_N }
        ]
    },
    {
        id: 5,
        text: "“白玉楼”这一名称典出哪位唐代诗人的临终传说？",
        explanation: "“帝成白玉楼，立召君为记。”李贺这故事太浪漫了。冥界不应该是阴森森的，而应该是有着在那边才能欣赏到的、只有死者才知道的风雅。所以我建了这座楼。",
        options: [
            { text: "李白", vector: W_N },
            { text: "杜甫", vector: W_N },
            { text: "李贺", vector: W_X },
            { text: "白居易", vector: W_N }
        ]
    },
    {
        id: 6,
        text: "在《永夜抄》中，真正制造了“伪月”现象的角色是谁？",
        explanation: "其实月亮是永琳换掉的，但如果你不把时间停下来（造成永夜），天亮了异变就没法在这个晚上解决了。所以说，这其实是你们（自机）和永琳的共谋哦？",
        options: [
            { text: "蓬莱山辉夜", vector: W_N },
            { text: "八意永琳", vector: W_Z },
            { text: "八云紫", vector: W_N },
            { text: "十六夜咲夜", vector: W_N }
        ]
    },
    {
        id: 7,
        text: "ZUN曾表示露米娅（Rumia）张开双手的姿势是在模仿什么？",
        explanation: "那个姿势就是模仿十字架上的圣人啦。明明是食人妖怪却摆出这种神圣的姿势，不觉得这种反差很有趣吗？就像是黑暗在拙劣地模仿光明一样。",
        options: [
            { text: "飞翔的鸟", vector: W_N },
            { text: "十字架上的圣人", vector: W_Y },
            { text: "稻草人", vector: W_N },
            { text: "拥抱黑暗", vector: W_N }
        ]
    },
    {
        id: 8,
        text: "西行妖之所以未能完全开花，是因为其树下封印着谁的肉身？",
        explanation: "樱花树下埋着尸体，这可是常识。西行妖下埋着的正是幽幽子自己。为了封印树而死，结果变成了亡灵又想让树开花，这种矛盾的循环，真的是……太悲伤了（喝）。",
        options: [
            { text: "西行法师", vector: W_N },
            { text: "西行寺幽幽子", vector: W_X },
            { text: "魂魄妖忌", vector: W_N },
            { text: "八云紫", vector: W_N }
        ]
    },
    {
        id: 9,
        text: "辉夜的符卡“不碎的意志”对应了五个难题中的哪件宝物？",
        explanation: "佛前的石钵。这东西最大的特点就是硬，完全敲不碎。所以做成了这种纯粹防御性的弹幕。想要在这种无聊的坚持面前展示勇气，可是很难的。",
        options: [
            { text: "蓬莱玉枝", vector: W_N },
            { text: "佛前的石钵", vector: W_Z },
            { text: "火鼠裘", vector: W_N },
            { text: "龙颈之玉", vector: W_N }
        ]
    },
    {
        id: 10,
        text: "《Cinderella Cage ~ Kagome-Kagome》这首曲子融合了灰姑娘与哪首日本童谣？",
        explanation: "灰姑娘必须在午夜前回去，笼中鸟总是出不来。把这两个东西混在一起，就是永远亭那种“静止的时间牢笼”的感觉了。在那里面的人，到底是想出来呢，还是不想呢？",
        options: [
            { text: "通通去", vector: W_N },
            { text: "笼中鸟", vector: W_Z },
            { text: "花一匁", vector: W_N },
            { text: "樱花樱花", vector: W_N }
        ]
    },
    {
        id: 11,
        text: "八意永琳的原型被广泛认为是日本神话中的哪位神祇？",
        explanation: "八意思兼神，智慧之神。说她是月之头脑一点都不夸张。毕竟是能在神话里给天照大神出主意的人，处理几个登月探测器什么的，简直是小菜一碟吧。",
        options: [
            { text: "月读命", vector: W_N },
            { text: "思兼神", vector: W_Z },
            { text: "天宇受卖命", vector: W_N },
            { text: "须佐之男", vector: W_N }
        ]
    },
    {
        id: 12,
        text: "“八云”这一姓氏源自日本神话中谁所作的第一首和歌？",
        explanation: "“八云立”是日本第一首和歌，也是须佐之男筑起结界保护妻子时唱的。所以“八云”这个名字本身就代表了境界和保护。很适合紫不是吗？虽然她看起来更有攻击性一点。",
        options: [
            { text: "伊味诺吉", vector: W_N },
            { text: "须佐之男", vector: W_X },
            { text: "天照大神", vector: W_N },
            { text: "大国主命", vector: W_N }
        ]
    },
    {
        id: 13,
        text: "ZUN称蕾米莉亚的主题曲《为逝去公主的七重奏》融合了爵士乐与什么风格？",
        explanation: "这首曲子用了爵士风格，但是那种稍微有点幼稚、有点任性的爵士。毕竟是“Loli”风格嘛。威严满满的大小姐，偶尔也要展露一下这种可爱（任性）的一面。",
        options: [
            { text: "巴洛克", vector: W_N },
            { text: "萝莉 (Loli) 元素", vector: W_Y },
            { text: "死亡金属", vector: W_N },
            { text: "进行曲", vector: W_N }
        ]
    },
    {
        id: 14,
        text: "在《永夜抄》魔理沙线中，她错误地指责谁是停止夜晚的元凶？",
        explanation: "魔理沙怀疑爱丽丝，灵梦怀疑咲夜。其实大家心里都有数，这晚上的时间是谁弄停的……但总得找个借口打一架嘛，这就是幻想乡的日常。",
        options: [
            { text: "灵梦", vector: W_N },
            { text: "爱丽丝", vector: W_Z },
            { text: "帕秋莉", vector: W_N },
            { text: "幽幽子", vector: W_N }
        ]
    },
    {
        id: 15,
        text: "ZUN将铃仙的“狂气之瞳”比作哪种人类不可见的光波？",
        explanation: "狂气之瞳发出的波长，与其说是光，不如说是红外线那样的东西。虽然看不见，但是会让人的精神变得狂乱。这种看不见的攻击最麻烦了。",
        options: [
            { text: "紫外线", vector: W_N },
            { text: "红外线", vector: W_Z },
            { text: "X射线", vector: W_N },
            { text: "伽马射线", vector: W_N }
        ]
    },
    {
        id: 16,
        text: "藤原妹红的不死与火焰能力，在民俗学隐喻上与哪座山有关？",
        explanation: "富士山（Fuji）就是不死（Fushi）。不死药本来该在那里烧掉的，结果被偷吃了。药没烧成，那火去哪了？当然是进到吃药的人（妹红）身体里了。她就是那座活着的火山啊。",
        options: [
            { text: "阿苏山", vector: W_N },
            { text: "富士山", vector: W_Z },
            { text: "恐山", vector: W_N },
            { text: "大江山", vector: W_N }
        ]
    },
    {
        id: 17,
        text: "《红魔乡》中哪位角色的符卡名致敬了阿加莎·克里斯蒂的小说《无人生还》？",
        explanation: "“And Then Will There Be None?” 这么经典的标题肯定要用一次。在地下室里玩这种大逃杀游戏的感觉，对于芙兰来说，可能只是普通的过家家吧？",
        options: [
            { text: "蕾米莉亚", vector: W_N },
            { text: "芙兰朵露", vector: W_Y },
            { text: "帕秋莉", vector: W_N },
            { text: "小恶魔", vector: W_N }
        ]
    },
    {
        id: 18,
        text: "“秘封俱乐部”中玛艾露贝莉·赫恩这一名字致敬了哪位怪谈作家？",
        explanation: "玛艾露贝莉·赫恩。Hearn就是小泉八云的本姓。如果现在的紫就是过去的梅莉……这可是个包含了时间旅行的大坑，我就不细说了（笑）。",
        options: [
            { text: "小泉八云 (Lafcadio Hearn)", vector: W_X },
            { text: "江户川乱步", vector: W_N },
            { text: "柳田国男", vector: W_N },
            { text: "梦野久作", vector: W_N }
        ]
    },
    {
        id: 19,
        text: "红美铃的主题曲《明治十七年的上海爱丽丝》中，ZUN提到的具体历史意象是什么？",
        explanation: "明治十七年的上海。那时候的租界，有着浓厚的西洋风情，和我们印象中的古老中国不太一样。美铃身上那种并非纯粹中华风、但也绝非和风的奇妙感觉，就是来自这里。",
        options: [
            { text: "紫禁城", vector: W_N },
            { text: "上海法租界", vector: W_Y },
            { text: "横滨中华街", vector: W_N },
            { text: "鸦片战争", vector: W_N }
        ]
    },
    {
        id: 20,
        text: "妖梦的“楼观剑”据称一刀能斩杀多少只幽灵？",
        explanation: "楼观剑太长了，根本不适合砍人。但是砍幽灵的话，一刀下去能解决十只呢。虽然我也搞不懂幽灵被砍了会怎么样，大概是变得更稀薄了吧？",
        options: [
            { text: "10只", vector: W_X },
            { text: "100只", vector: W_N },
            { text: "无数只", vector: W_N },
            { text: "无法斩杀幽灵", vector: W_N }
        ]
    },
    {
        id: 21,
        text: "在《永夜抄》的故事逻辑中，所谓的“永夜”本质上是什么？",
        explanation: "月亮确实是假的，但让这个夜晚变得漫长得离谱的，可是你们这些不想去睡觉的家伙（主角）啊。所谓的永夜，其实就是大家一起陪着辉夜小姐熬夜罢了。",
        options: [
            { text: "时间的倒流", vector: W_N },
            { text: "主角们停止了时刻", vector: W_Z },
            { text: "月亮的幻术", vector: W_N },
            { text: "永琳的结界", vector: W_N }
        ]
    }
];
