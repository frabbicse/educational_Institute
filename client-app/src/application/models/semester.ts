export interface ISemester {
    forEach(arg0: (semester: ISemester) => void): unknown;
    semesterId: number,
    name: string
}