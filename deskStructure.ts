export const structure = (S, context) => {
    return S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Site Settings')
                .child(
                    S.editor()
                        .id('siteSettings')
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                        .title('Site Settings')
                        ),
            S.listItem()
            .title('Pages')
            // .icon(Pages)
            .child(
                S.list()
                .title('Pages')
                .items([
                    S.documentListItem()
                    .schemaType('pageHome')
                    .id('pageHome'),
                    S.documentListItem()
                    .schemaType('pageAbout')
                    .id('pageAbout'),
                    S.documentListItem()
                    .schemaType('pageWork')
                    .id('pageWork'),
                ])),
            ... S.documentTypeListItems()
                    .filter(
                        (listItem) => ![
                            'siteSettings', 
                            'pageHome', 
                            'pageAbout', 
                            'pageWork',
                            'category']
                            .includes(listItem.getId())
                    )
        ])
}