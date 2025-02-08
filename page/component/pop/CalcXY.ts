export default function CalcXY(params: { wE: number, hE: number, dom: DOMRect }) {
    let wS = window.outerWidth
    let hS = window.outerHeight
    let x = 0
    let y = 0
    let topSide = params.dom.top
    let bottomSide = Math.abs(hS - params.dom.height)

    let leftSide = params.dom.left
    let rightSide = Math.abs(wS - params.dom.right)
    if (topSide > bottomSide) {
        y = params.dom.top - params.hE
    }
    else {
        y = params.dom.bottom
    }
    if (leftSide > rightSide) {
        x = params.dom.right - params.wE
        
    }
    else {
        x = params.dom.left

    }
    return { x, y }
}