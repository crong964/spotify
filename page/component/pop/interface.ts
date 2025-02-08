export interface iPop extends React.AllHTMLAttributes<HTMLDListElement> {
    top: number | string,
    left: number | string
    children: React.JSX.Element

}
export interface iModal extends React.AllHTMLAttributes<HTMLDListElement> {
    top: number | string,
    left: number | string
    bottom?: number | string
    children: React.JSX.Element
    show(s: boolean): void
}
export interface iNotification extends React.AllHTMLAttributes<HTMLDivElement> {

}