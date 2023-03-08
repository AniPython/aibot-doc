
.. raw:: html

    <nav>
      <ul>
        {% for v in versions %}
          <li{% if v.label == version %} class="active"{% endif %}><a href="{{ v.url }}">{{ v.label }}</a></li>
        {% endfor %}
      </ul>
    </nav>
