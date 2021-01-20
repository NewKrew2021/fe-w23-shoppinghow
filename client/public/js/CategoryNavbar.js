import categoryData from '../data/categoryData';
import CustomDomAPI from '../utils/CustomDomAPI';
import '../css/CategoryNavbar.css';


const ColumnId = {"first-category": 0, "second-category": 1, "third-category": 2};
const CONTAINER_CLASSNAME = ".category__container"
const BUTTON_CLASSNAME = ".category__button";

/**
 * 1. 각 column의 현재 index 값을 배열로 가지고 있다.
 *  ex) [0, 0, 0]
 * 2. 현재 마우스 움직임을 인식하고 있는 active한 컬럼을 current라고 정의한다.
 * 
 * 메뉴 버튼에서 mouseenter event를 리슨한다.
 * mouseenter event가 발생한 경우 container를 active로 설정한다.
 * 
 * 모든 컬럼을 담고 있는 container에서 mouseleave event를 리슨한다.
 * mouseleave event가 발생한 경우 container를 non-active로 설정한다.
 * 
 * 각각의 컬럼에서 mouseenter event를 리슨한다.
 * mouseenter event가 발생하면 current를 해당 event가 발생한 컬럼으로 설정한다.
 * 
 * current 컬럼에서는 mousemove event를 리슨하고 있다가 stop 되는 순간 하위 column의 내용을 업데이트한다.
 * current 컬럼에서는 event delegation을 통해 모든 li element에서 mouseover event를 리슨하고 
 * mouseover event가 일어나면 indexs[current] 의 값을 변경한다.
 */
class CategoryNavbarManager {
    constructor() {
        this.currentIndexes = [0, 0];
        this.currentCol = 0;
        this.timerForMouseStop = undefined;
        this.onEnterCol = this.onEnterCol.bind(this);
        this.renderer = new CategoryNavbarRenderer();
        this.button = CustomDomAPI.querySelector(BUTTON_CLASSNAME);
        this.container = CustomDomAPI.querySelector(CONTAINER_CLASSNAME);
        this.init();
    }

    init() {
        this.button.addEventListener('mouseenter', (e) => {
            this.container.className="category__container active";
        })
        this.container.addEventListener('mouseleave', () => {
            this.container.className="category__container non-active";
        })
        // this.timerForMouseStop = ;
        document.querySelectorAll('.category__container > div').forEach(element => {
            element.addEventListener('mouseenter', this.onEnterCol);
        });
    }

    getDataForCol(index) {
        let colData = {};
        if (index === 2) return;
        if (index === 0) {
            colData = categoryData.data[this.currentIndexes[0]].data 
        } else if (index === 1) {
            colData = categoryData.data[this.currentIndexes[0]].data[this.currentIndexes[1]].data
        }
        return colData;
    }

    onEnterCol(e) {
        const columnEle = e.currentTarget;
        const enteredCol = ColumnId[e.currentTarget.className];
        if (enteredCol === this.currentCol) return;
        
        this.currentCol = ColumnId[e.currentTarget.className];
        // columnEle.addEventListener('mouseover', () => {
        // })
        if (this.currentCol < 2) {
            columnEle.addEventListener('mousemove', (e) => {
                const index = e.target.closest('li').getAttribute('data-index');
                clearTimeout(this.timerForMouseStop);
                this.timerForMouseStop = setTimeout(() => {
                    if (!e.target.closest('li') || this.currentIndexes[this.currentCol] === index) {
                        return;
                    }
                    this.currentIndexes[this.currentCol] = index;
                    if (this.currentCol === 0) {
                        this.currentIndexes[this.currentCol + 1] = 0;
                        this.renderer.updateColumn(this.currentCol + 1, this.getDataForCol(this.currentCol + 1));
                    }
                    // 첫번째 메뉴에서는 active를 유지시킨다.
                    // this.renderer.selectIndex(this.currentCol, index);
                    this.renderer.updateColumn(
                        this.currentCol, this.getDataForCol(this.currentCol)
                    );
                }, 100);
            })
        }
    }

    onChangeCurrentCol() {
        
    }
}

class CategoryNavbarRenderer {
    constructor(indexes = [0, 0]) {
        this.indexes = indexes;
        this.renderList = this.renderList.bind(this);
        this.renderFirstCol = this.renderFirstCol.bind(this);
        this.renderSecondCol = this.renderSecondCol.bind(this);
        this.renderThirdCol = this.renderThirdCol.bind(this);
        this.container = CustomDomAPI.querySelector(CONTAINER_CLASSNAME);
        this.initialRender();
    }

    initialRender() {
        this.renderFirstCol(categoryData.data);
        this.renderSecondCol(categoryData.data[this.indexes[0]].data);
        this.renderThirdCol(categoryData.data[this.indexes[0]].data[this.indexes[1]].data);
    }

    renderList(data) {
        let innerHtml = "";
        let count = 0;
        data.forEach((element)=>{
            innerHtml += `<li data-index="${count}">${element.title}</li>`;
            count ++;
        })
        innerHtml = `<ul>${innerHtml}</ul>`
        return innerHtml;
    }

    renderFirstCol(colData) {
        const firstColEle = CustomDomAPI.querySelector(".first-category");
        firstColEle.innerHTML = this.renderList(colData);
    }

    renderSecondCol(colData) {
        const secondColEle = CustomDomAPI.querySelector(".second-category");
        secondColEle.innerHTML = this.renderList(colData);
    }

    renderThirdCol(colData) {
        const thirdColEle = CustomDomAPI.querySelector(".third-category");
        thirdColEle.innerHTML = this.renderList(colData);
    }

    selectIndex(prevCol, index) {
        // const ColEles = document.querySelectorAll(CONTAINER_CLASSNAME + ` > div:nth-child(${prevCol}) `);
        // console.log(ColEles)
        // for (ele of ColEles) {
        //     if (ele.getAttribute('data-index') === index) {
        //         ele.className = "active";
        //     } else {
        //         ele.className = "non-active"
        //     }
        // }
        // // ul > li:nth-child(${index})
        // console.log(ColEles);

    }

    updateColumn(currentCol, colData) {
        if (currentCol === 1) {
            this.renderThirdCol(colData);
        } else if (currentCol === 0) {
            this.renderSecondCol(colData);
        }

    }
};

export default CategoryNavbarManager;