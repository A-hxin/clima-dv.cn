export const tableColumnClass = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
    if (rowIndex % 2) {
        return 'bg-1'
    } else {
        return 'bg-2'
    }
}
