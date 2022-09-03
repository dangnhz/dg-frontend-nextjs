export default function stripTags(originalString:string) {
    if (originalString) return originalString.replace(/(<([^>]+)>)/gi, "")
}