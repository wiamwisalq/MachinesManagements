<c:if test="${not empty nom}">
    <%--If you want to print content from session--%>
    <p style="color: #171717;">${nom}</p>

    <%--If you want to include html--%>
  

    <%--include only get wrong if you give the incorrect file path --%>
</c:if>
<c:if test="${empty nom}">
    <p>Jaathi mcn Jaathi</p>
</c:if>